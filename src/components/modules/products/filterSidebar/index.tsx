"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { currencyFormatter } from "@/lib/currencyFormatter";
import { getAllBrands } from "@/services/brand";
import { getAllCategories } from "@/services/category";
import { Star } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const FilterSidebar = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [price, setPrice] = useState([0]);
	const [brands, setBrands] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);

			try {
				const [{ data: categoriesData }, { data: brandsData }] =
					await Promise.all([getAllCategories(), getAllBrands()]);

				setCategories(categoriesData);
				setBrands(brandsData);
			} catch (err: any) {
				console.error(err);
				toast.error("Failed to fetch filters");
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	const handleSearchQuery = (query: string, value: string | number) => {
		const params = new URLSearchParams(searchParams.toString());

		params.set(query, value.toString());

		router.push(`${pathname}?${params.toString()}`, {
			scroll: false,
		});
	};

	return (
		<div className="p-6 bg-white rounded-lg">
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-xl font-semibold py-1">Filter</h2>
				{searchParams.toString().length > 0 && (
					<Button
						onClick={() => {
							router.push(`${pathname}`, {
								scroll: false,
							});
						}}
						size="sm"
						className="bg-black hover:bg-gray-700 ml-5 cursor-pointer"
					>
						Clear Filters
					</Button>
				)}
			</div>
			{/* Filter by Price */}
			<div className="mb-6">
				<h2 className="text-lg font-semibold mb-4">Price</h2>
				<div className="flex items-center justify-between text-sm mb-2">
					<span>{currencyFormatter(0)}</span>
					<span>{currencyFormatter(50000)}</span>
				</div>
				<Slider
					max={50000}
					step={1}
					onValueChange={(value) => {
						setPrice(value);
						handleSearchQuery("price", value[0]);
					}}
					className="w-full py-1"
				/>
				<p className="text-sm mt-2">
					Selected Price: {currencyFormatter(price[0])}
				</p>
			</div>
			{/* Product Types */}
			<div className="mb-6">
				<h2 className="text-lg font-semibold mb-4">Product Category</h2>
				{!isLoading && (
					<RadioGroup className="space-y-2">
						{categories?.map((category: { _id: string; name: string }) => (
							<div key={category._id} className="flex items-center space-x-2">
								<RadioGroupItem
									onClick={() => handleSearchQuery("category", category._id)}
									value={category._id}
									id={category._id}
								/>
								<Label
									htmlFor={category._id}
									className="text-gray-500 font-light"
								>
									{category.name}
								</Label>
							</div>
						))}
					</RadioGroup>
				)}
			</div>
			{/* Brands */}
			<div className="mb-6">
				<h2 className="text-lg font-semibold mb-4">Brands</h2>
				{!isLoading && (
					<RadioGroup className="space-y-2">
						{brands?.map((brand: { _id: string; name: string }) => (
							<div key={brand._id} className="flex items-center space-x-2">
								<RadioGroupItem
									onClick={() => handleSearchQuery("brand", brand._id)}
									value={brand._id}
									id={brand._id}
								/>
								<Label htmlFor={brand._id} className="text-gray-500 font-light">
									{brand.name}
								</Label>
							</div>
						))}
					</RadioGroup>
				)}
			</div>
			{/* Rating */}
			<div className="mb-6">
				<h2 className="text-lg font-semibold mb-4">Rating</h2>
				<RadioGroup className="space-y-3">
					{[5, 4, 3, 2, 1].map((rating) => (
						<div key={rating} className="flex items-center space-x-2">
							<RadioGroupItem
								onClick={() => handleSearchQuery("rating", rating)}
								value={`${rating}`}
								id={`rating-${rating}`}
							/>
							<Label htmlFor={`rating-${rating}`} className="flex items-center">
								{Array.from({ length: 5 }, (_, i) => (
									<Star
										size={18}
										key={i}
										fill={i < rating ? "orange" : "lightgray"}
										stroke={i < rating ? "orange" : "lightgray"}
									/>
								))}
							</Label>
						</div>
					))}
				</RadioGroup>
			</div>
		</div>
	);
};

export default FilterSidebar;

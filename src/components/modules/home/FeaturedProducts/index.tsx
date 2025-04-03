import ProductCard from "@/components/ui/core/ProductCard";
import { getAllProducts } from "@/services/product";
import { TProduct } from "@/types";
import SectionTitle from "../SectionTitle";

const FeaturedProducts = async () => {
	const { data: products } = await getAllProducts();

	return (
		<div className="bg-white bg-opacity-50 py-10">
			<div className="container mx-auto">
				<SectionTitle
					title="Featured Products"
					BtnUrl="/products"
					BtnLabel="All Collection"
				/>

				<div className="grid grid-cols-5 gap-8 my-5">
					{Array(5)
						.fill(products?.[0])
						.map((product: TProduct, idx: number) => (
							<ProductCard key={idx} product={product} />
						))}
				</div>
			</div>
		</div>
	);
};

export default FeaturedProducts;

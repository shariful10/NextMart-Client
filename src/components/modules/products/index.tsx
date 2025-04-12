import ProductCard from "@/components/ui/core/ProductCard";
import { TProduct } from "@/types";
import FilterSidebar from "./filterSidebar";

const Products = ({ products }: { products: TProduct[] }) => {
	return (
		<div className="flex gap-4 my-10">
			<div className="w-full max-w-sm border-2 border-gray-200 rounded-xl">
				<FilterSidebar />
			</div>
			<div>
				<div className="grid grid-cols-4 gap-4">
					{products?.map((product: TProduct, idx: number) => (
						<ProductCard key={idx} product={product} />
					))}
				</div>
			</div>
		</div>
	);
};

export default Products;

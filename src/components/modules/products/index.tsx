import ProductCard from "@/components/ui/core/ProductCard";
import { TProduct } from "@/types";
import FilterSidebar from "./filterSidebar";

const Products = ({ products }: { products: TProduct[] }) => {
	return (
		<div className="flex gap-8 my-10">
			<div>
				<FilterSidebar />
			</div>
			<div>
				<div className="grid grid-cols-4 gap-12">
					{products?.map((product: TProduct, idx: number) => (
						<ProductCard key={idx} product={product} />
					))}
				</div>
			</div>
		</div>
	);
};

export default Products;

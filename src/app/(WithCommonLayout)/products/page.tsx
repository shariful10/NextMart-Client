import Products from "@/components/modules/products";
import ProductBanner from "@/components/modules/products/banner";
import CategoryCard from "@/components/ui/core/CategoryCard";
import NMContainer from "@/components/ui/core/NMContainer";
import { getAllCategories } from "@/services/category";
import { getAllProducts } from "@/services/product";
import { TCategory } from "@/types";

const ProductsPage = async () => {
	const { data: categories } = await getAllCategories();
	const { data: products } = await getAllProducts();

	return (
		<NMContainer>
			<ProductBanner title="All Products" path="Home - Products" />
			<h2 className="text-xl font-bold my-5">Featured Collection </h2>
			<div className="grid grid-cols-6 gap-6">
				{categories?.slice(0, 6).map((category: TCategory, idx: number) => (
					<CategoryCard key={idx} category={category} />
				))}
			</div>
			<Products products={products} />
		</NMContainer>
	);
};

export default ProductsPage;

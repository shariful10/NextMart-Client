import NMContainer from "@/components/ui/core/NMContainer";
import ProductCard from "@/components/ui/core/ProductCard";
import { getAllProducts } from "@/services/product";
import { TProduct } from "@/types";
import SectionTitle from "../SectionTitle";

const FeaturedProducts = async () => {
	const { data: products } = await getAllProducts();

	return (
		<div className="bg-white bg-opacity-50 py-10">
			<NMContainer className="my-16">
				<SectionTitle
					title="Featured Products"
					BtnUrl="/products"
					BtnLabel="All Collection"
				/>

				<div className="grid grid-cols-5 gap-8 my-5">
					{products?.map((product: TProduct, idx: number) => (
						<ProductCard key={idx} product={product} />
					))}
				</div>
			</NMContainer>
		</div>
	);
};

export default FeaturedProducts;

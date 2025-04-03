import CategoryCard from "@/components/ui/core/CategoryCard";
import { getAllCategories } from "@/services/category";
import { TCategory } from "@/types";
import SectionTitle from "../SectionTitle";

const Category = async () => {
	const { data: categories } = await getAllCategories();
	return (
		<div className="container mx-auto my-20">
			<SectionTitle title="Category" BtnUrl="/products" BtnLabel="View All" />
			<div className="grid grid-cols-6 gap-8 my-5">
				{Array(12)
					.fill(categories?.[0])
					.map((category: TCategory, idx: number) => (
						<CategoryCard key={idx} category={category} />
					))}
			</div>
		</div>
	);
};

export default Category;

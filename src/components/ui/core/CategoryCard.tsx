import { TCategory } from "@/types";
import Image from "next/image";

const CategoryCard = ({ category }: { category: TCategory }) => {
	return (
		<div className="bg-white bg-opacity-50 border-2 border-gray-100 rounded-2xl text-center p-6 h-44 group">
			<Image
				src={category?.icon}
				width={100}
				height={150}
				alt="category icon"
				className="mx-auto min-h-[100px] group-hover:scale-110 transition-all duration-500 ease-in-out"
			/>
			<h3 className="text-lg font-semibold truncate mt-3">{category?.name}</h3>
		</div>
	);
};

export default CategoryCard;

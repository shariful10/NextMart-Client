import NMContainer from "@/components/ui/core/NMContainer";
import { getAllBrands } from "@/services/brand";
import { TBrand } from "@/types";
import Image from "next/image";
import SectionTitle from "../SectionTitle";

const TopBrands = async () => {
	const { data: brands } = await getAllBrands();

	return (
		<NMContainer className="my-36">
			<SectionTitle
				title="Top Brands"
				BtnUrl="/products"
				BtnLabel="All Collection"
			/>
			<div className="grid grid-cols-4 gap-6 my-10 ">
				{brands?.slice(0, 4)?.map((brand: TBrand, idx: number) => (
					<div className="bg-white p-3 rounded-xl" key={idx}>
						<div className="bg-gray-100 p-2 rounded-xl h-20 w-full">
							<Image
								src={brand?.logo}
								width={50}
								height={50}
								alt="category icon"
								className="mx-auto h-full w-full object-contain"
							/>
						</div>
					</div>
				))}
			</div>
		</NMContainer>
	);
};

export default TopBrands;

import Category from "@/components/modules/home/category";
import FeaturedProducts from "@/components/modules/home/FeaturedProducts";
import FlashSale from "@/components/modules/home/FlashSale";
import HeroSection from "@/components/modules/home/heroSection";
import TopBrands from "@/components/modules/home/topBrands";
import { getNewToken } from "@/services/authServices";

const HomePage = async () => {
	const res = await getNewToken();
	console.log(res);

	return (
		<>
			<HeroSection />
			<Category />
			<FeaturedProducts />
			<FlashSale />
			<TopBrands />
		</>
	);
};

export default HomePage;

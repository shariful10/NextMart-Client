import Category from "@/components/modules/home/category";
import FeaturedProducts from "@/components/modules/home/FeaturedProducts";
import FlashSale from "@/components/modules/home/FlashSale";
import HeroSection from "@/components/modules/home/heroSection";

const HomePage = () => {
	return (
		<>
			<HeroSection />
			<Category />
			<FeaturedProducts />
			<FlashSale />
		</>
	);
};

export default HomePage;

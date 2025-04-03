import Category from "@/components/modules/home/category";
import FeaturedProducts from "@/components/modules/home/FeaturedProducts";
import HeroSection from "@/components/modules/home/heroSection";

const HomePage = () => {
	return (
		<>
			<HeroSection />
			<Category />
			<FeaturedProducts />
		</>
	);
};

export default HomePage;

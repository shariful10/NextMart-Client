"use client";

import HeroSection from "@/components/modules/home/heroSection";
import { useUser } from "@/context/UserContext";

const HomePage = () => {
	const user = useUser();
	console.log(user);

	return (
		<div>
			<HeroSection />
		</div>
	);
};

export default HomePage;

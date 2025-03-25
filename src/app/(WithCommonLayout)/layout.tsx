import Footer from "@/components/shared/Footer";
import { Navbar } from "@/components/shared/Navbar";
import { ReactNode } from "react";

const CommonLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div>
			<Navbar />
			<div className="min-h-[calc(100vh-448px)]">{children}</div>
			<Footer />
		</div>
	);
};

export default CommonLayout;

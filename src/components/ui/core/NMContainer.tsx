import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type NMContainerProps = {
	children: ReactNode;
	className?: string;
};

const NMContainer = ({ children, className }: NMContainerProps) => {
	return (
		<div className={cn("container mx-auto px-5", className)}>{children}</div>
	);
};

export default NMContainer;

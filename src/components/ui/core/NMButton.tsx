import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Button } from "../button";

type TNMButtonProps = {
	btnLabel: string;
	className?: string;
	btnIcon?: ReactNode;
	onClick?: () => void;
};

const NMButton = ({
	className,
	btnLabel,
	btnIcon,
	onClick,
}: TNMButtonProps) => {
	return (
		<Button onClick={onClick} className={cn("cursor-pointer", className)}>
			<span>{btnLabel}</span> {btnIcon && btnIcon}
		</Button>
	);
};

export default NMButton;

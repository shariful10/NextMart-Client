import { LucideIcon } from "lucide-react";

export type TProjectsProps = {
	name: string;
	url: string;
	icon: LucideIcon;
}[];

export type TNavMainProps = {
	title: string;
	url: string;
	icon?: LucideIcon;
	isActive?: boolean;
	items?: {
		title: string;
		url: string;
	}[];
}[];

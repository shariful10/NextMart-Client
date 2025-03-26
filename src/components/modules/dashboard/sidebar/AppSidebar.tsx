"use client";

import { Bot, LifeBuoy, Send, Settings, SquareTerminal } from "lucide-react";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarRail,
} from "@/components/ui/sidebar";
import { ComponentProps } from "react";
import { NavMain } from "./NavMain";
import { NavUser } from "./NavUser";

// This is sample data.
const data = {
	navMain: [
		{
			title: "Dashboard",
			url: "/user/dashboard",
			icon: SquareTerminal,
			isActive: true,
		},
		{
			title: "Shop",
			url: "/user/shop/all-products",
			icon: Bot,
			items: [
				{
					title: "Manage Products",
					url: "/user/shop/all-products",
				},
				{
					title: "Manage Categories",
					url: "/user/shop/category",
				},
				{
					title: "Manage Brands",
					url: "/user/shop/brand",
				},
			],
		},

		{
			title: "Settings",
			url: "#",
			icon: Settings,
			items: [
				{
					title: "Profile",
					url: "/profile",
				},
			],
		},
	],
	navSecondary: [
		{
			title: "Support",
			url: "#",
			icon: LifeBuoy,
		},
		{
			title: "Feedback",
			url: "#",
			icon: Send,
		},
	],
};

export const AppSidebar = ({ ...props }: ComponentProps<typeof Sidebar>) => {
	return (
		<Sidebar variant="inset" {...props}>
			<SidebarContent>
				<NavMain items={data.navMain} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
};

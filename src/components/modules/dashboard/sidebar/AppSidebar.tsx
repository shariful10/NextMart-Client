"use client";

import { Bot, LifeBuoy, Send, Settings, SquareTerminal } from "lucide-react";

import Logo from "@/app/assets/Logo";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
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
			url: "#",
			icon: Bot,
			items: [
				{
					title: "Manage Products",
					url: "/user/shop/products",
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
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<Link href="/">
								<div className="flex items-end justify-center">
									<Logo />
								</div>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<h2 className="text-xl font-bold">NextMart</h2>
								</div>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
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

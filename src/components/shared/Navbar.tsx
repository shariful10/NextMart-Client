import Logo from "@/app/assets/Logo";
import { Heart, LogOut, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
	return (
		<header className="border-b w-full">
			<div className="container flex justify-between items-center mx-auto h-16 px-3">
				<Link href="/" className="text-2xl font-black flex items-center">
					<Logo />
					ext Mart
				</Link>
				<div className="max-w-md  flex-grow">
					<input
						type="text"
						placeholder="Search for products"
						className="w-full max-w-6xl border border-gray-300 rounded-full py-2 px-5"
					/>
				</div>
				<nav className="flex gap-2">
					<Button variant="outline" className="rounded-full p-0 size-10">
						<Heart />
					</Button>
					<Button variant="outline" className="rounded-full p-0 size-10">
						<ShoppingBag />
					</Button>
					<Link href="/login">
						<Button variant="outline" className="rounded-full">
							Login
						</Button>
					</Link>
					<Link href="/create-shop">
						<Button variant="outline" className="rounded-full">
							Create Shop
						</Button>
					</Link>
					<DropdownMenu>
						<DropdownMenuTrigger>
							<Avatar>
								<AvatarImage src="https://github.com/shadcn.png" />
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="absolute -left-5">
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Profile</DropdownMenuItem>
							<DropdownMenuItem>Dashboard</DropdownMenuItem>
							<DropdownMenuItem>My Shop</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem className="cursor-pointer">
								<LogOut /> <span>Log Out</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</nav>
			</div>
		</header>
	);
}

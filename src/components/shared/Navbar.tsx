"use client";

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
import { protectedRoutes } from "@/constants";
import { useUser } from "@/context/UserContext";
import { logout } from "@/services/authServices";
import { usePathname, useRouter } from "next/navigation";

export const Navbar = () => {
	const router = useRouter();
	const pathname = usePathname();
	const { user, setIsLoading } = useUser();

	const handleLogOut = () => {
		logout();
		setIsLoading(true);

		if (protectedRoutes.some((route) => pathname.match(route))) {
			router.push("/");
		}
	};

	return (
		<header className="border-b w-full sticky top-0 z-10 bg-background scroll-smooth">
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
					<Button
						variant="outline"
						className="rounded-full p-0 size-10 cursor-pointer"
					>
						<Heart />
					</Button>
					<Button
						variant="outline"
						className="rounded-full p-0 size-10 cursor-pointer"
					>
						<ShoppingBag />
					</Button>
					{user ? (
						<>
							<Link href="/create-shop">
								<Button className="rounded-full cursor-pointer">
									Create Shop
								</Button>
							</Link>
							<DropdownMenu>
								<DropdownMenuTrigger>
									<Avatar className="cursor-pointer">
										<AvatarImage src="https://github.com/shadcn.png" />
										<AvatarFallback>CN</AvatarFallback>
									</Avatar>
								</DropdownMenuTrigger>
								<DropdownMenuContent className="absolute -left-5">
									<DropdownMenuLabel>My Account</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuItem>
										<Link href="/profile">Profile</Link>
									</DropdownMenuItem>
									<DropdownMenuItem>
										<Link href="/user/dashboard">Dashboard</Link>
									</DropdownMenuItem>
									<DropdownMenuItem>My Shop</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem
										onClick={handleLogOut}
										className="cursor-pointer hover:text-red-500"
									>
										<LogOut className="hover:text-red-500" />{" "}
										<span>Log Out</span>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</>
					) : (
						<Link href="/login">
							<Button className="rounded-full cursor-pointer">Login</Button>
						</Link>
					)}
				</nav>
			</div>
		</header>
	);
};

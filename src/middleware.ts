import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/authServices";

type TRole = keyof typeof roleBasedPrivateRoutes;

const authRoutes = ["/login", "/register"];

const roleBasedPrivateRoutes = {
	user: [/^\/user/, /^\/create-shop/],
	admin: [/^\/admin/, /^\/create-shop/],
};

export const middleware = async (req: NextRequest) => {
	const { pathname } = req.nextUrl;

	const userInfo = await getCurrentUser();

	if (!userInfo) {
		if (authRoutes.includes(pathname)) {
			return NextResponse.next();
		} else {
			return NextResponse.redirect(
				new URL(`http://localhost:3000/login?redirectPath=${pathname}`, req.url)
			);
		}
	}

	if (userInfo?.role && roleBasedPrivateRoutes[userInfo?.role as TRole]) {
		const routes = roleBasedPrivateRoutes[userInfo?.role as TRole];

		if (routes.some((route) => pathname.match(route))) {
			return NextResponse.next();
		}
	}

	return NextResponse.redirect(new URL("/", req.url));
};

export const config = {
	matcher: [
		"/login",
		"/create-shop",
		"/admin",
		"/admin/:page",
		"/user",
		"/user/:page",
	],
};

import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/authServices";

const authRoutes = ["/login", "/register"];

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
};

export const config = {
	matcher: ["/login", "/create-shop"],
};

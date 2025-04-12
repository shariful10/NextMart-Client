"use server";

import { isTokenExpired } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { getNewToken } from "../authServices";

export const createBrand = async (data: FormData) => {
	const cookieStore = await cookies();

	let token = cookieStore.get("accessToken")!.value;

	if (!token || (await isTokenExpired(token))) {
		const { data } = await getNewToken();
		token = data?.accessToken;
		cookieStore.set("accessToken", token);
	}

	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/brand`, {
			method: "POST",
			headers: {
				Authorization: token,
			},
			body: data,
		});

		revalidateTag("BRAND");

		return res.json();
	} catch (error: any) {
		return Error(error);
	}
};

export const getAllBrands = async () => {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/brand`, {
			next: {
				tags: ["BRAND"],
			},
		});

		return res.json();
	} catch (error: any) {
		return Error(error);
	}
};

export const deleteBrand = async (brandId: string): Promise<any> => {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_API}/brand/${brandId}`,
			{
				method: "DELETE",
				headers: {
					Authorization: (await cookies()).get("accessToken")!.value,
				},
			}
		);

		revalidateTag("BRAND");

		return res.json();
	} catch (error: any) {
		return Error(error);
	}
};

"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

// Get all products
export const getAllProducts = async (page?: string, limit?: string) => {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_API}/product?page=${page}&limit=${limit}`,
			{
				next: {
					tags: ["PRODUCT"],
				},
			}
		);
		const data = await res.json();
		return data;
	} catch (error: any) {
		return Error(error.message);
	}
};

// Get single product
export const getSingleProduct = async (productId: string) => {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_API}/product/${productId}`,
			{
				next: {
					tags: ["PRODUCT"],
				},
			}
		);
		const data = await res.json();
		return data;
	} catch (error: any) {
		return Error(error.message);
	}
};

// Add product
export const addProduct = async (productData: FormData): Promise<any> => {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/product`, {
			method: "POST",
			body: productData,
			headers: {
				Authorization: (await cookies()).get("accessToken")!.value,
			},
		});

		revalidateTag("PRODUCT");

		return res.json();
	} catch (error: any) {
		return Error(error);
	}
};

// Update product
export const updateProduct = async (
	productData: FormData,
	productId: string
): Promise<any> => {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_API}/product/${productId}`,
			{
				method: "PATCH",
				body: productData,
				headers: {
					Authorization: (await cookies()).get("accessToken")!.value,
				},
			}
		);
		revalidateTag("PRODUCT");
		return res.json();
	} catch (error: any) {
		return Error(error);
	}
};

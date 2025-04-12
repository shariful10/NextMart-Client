"use server";
import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";

// Get all products
export const getAllProducts = async (
	page?: string,
	limit?: string,
	query?: { [key: string]: string | string[] | undefined }
) => {
	const params = new URLSearchParams();

	if (query?.price) {
		params.append("minPrice", "0");
		params.append("maxPrice", query?.price.toString());
	}

	if (query?.category) {
		params.append("categories", query?.category.toString());
	}

	if (query?.brand) {
		params.append("brands", query?.brand.toString());
	}

	if (query?.rating) {
		params.append("ratings", query?.rating.toString());
	}

	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_API}/product?page=${page}&limit=${limit}&${params}`,
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
	const token = await getValidToken();

	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/product`, {
			method: "POST",
			body: productData,
			headers: {
				Authorization: token,
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
		const token = await getValidToken();

		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_API}/product/${productId}`,
			{
				method: "PATCH",
				body: productData,
				headers: {
					Authorization: token,
				},
			}
		);
		revalidateTag("PRODUCT");
		return res.json();
	} catch (error: any) {
		return Error(error);
	}
};

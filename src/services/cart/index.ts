"use server";

import { getValidToken } from "@/lib/verifyToken";
import { TOrder } from "@/types";

export const createOrder = async (order: TOrder) => {
	const token = await getValidToken();

	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/order`, {
			method: "POST",
			headers: {
				Authorization: token,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(order),
		});

		return await res.json();
	} catch (err: any) {
		return Error(err);
	}
};

// export const addCoupon = async ({
// 	shopId,
// 	orderAmount,
// 	couponCode,
// }: TCoupon) => {
// 	try {
// 		const res = await fetch(
// 			`${process.env.NEXT_PUBLIC_BASE_API}/coupon/${couponCode}`,
// 			{
// 				method: "POST",
// 				headers: {
// 					Authorization: (await cookies()).get("accessToken")!.value,
// 					"Content-Type": "application/json",
// 				},
// 				body: JSON.stringify({ orderAmount, shopId }),
// 			}
// 		);

// 		return await res.json();
// 	} catch (err: any) {
// 		return Error(err);
// 	}
// };

export const addCoupon = async (
	couponCode: string,
	subTotal: number,
	shopId: string
) => {
	const token = await getValidToken();

	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_API}/coupon/${couponCode}`,
			{
				method: "POST",
				headers: {
					Authorization: token,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ orderAmount: subTotal, shopId }),
			}
		);

		return await res.json();
	} catch (err: any) {
		return Error(err);
	}
};

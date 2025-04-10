"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { shopSelector, subTotalSelector } from "@/redux/features/cartSlice";
import { useAppSelector } from "@/redux/hook";
import { addCoupon } from "@/services/cart";
import { Trash } from "lucide-react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const Coupon = () => {
	const form = useForm();

	const shopId = useAppSelector(shopSelector);
	const subTotal = useAppSelector(subTotalSelector);

	const couponInput = form.watch("coupon");

	const handleRemoveCoupon = () => {
		form.reset();
	};

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		try {
			const couponData = {
				shopId,
				orderAmount: subTotal,
				couponCode: data.coupon,
			};

			const res = await addCoupon(couponData);
			console.log(res);

			// if (res.error) {
			// 	toast.error(res.error);
			// } else {
			// 	toast.error(res.message);
			// }
		} catch (err: any) {
			console.log(err);
			toast.error(err.message);
		}
	};

	return (
		<div className="border-2 border-white bg-background brightness-105 rounded-md col-span-4  p-5 ">
			<div className="flex flex-col justify-between h-full">
				<h1 className="text-2xl font-bold">Use Coupon code</h1>
				<p className="text-gray-500">Enter your coupon code if you have one.</p>

				<Form {...form}>
					<form className="mt-3" onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name="coupon"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											{...field}
											placeholder="Promo / Coupon code"
											value={field.value}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<div className="flex gap-3 mt-3">
							<Button
								disabled={!couponInput}
								type="submit"
								className="w-full text-xl font-semibold py-5 cursor-pointer"
							>
								Apply
							</Button>
							{couponInput && (
								<Button
									onClick={handleRemoveCoupon}
									variant="outline"
									className="bg-red-100 rounded-full size-10 cursor-pointer"
								>
									<Trash size={24} className="text-red-500" />
								</Button>
							)}
						</div>
					</form>
				</Form>
			</div>
		</div>
	);
};
export default Coupon;

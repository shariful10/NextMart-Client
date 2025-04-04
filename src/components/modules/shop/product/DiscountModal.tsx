"use client";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addFlashSale } from "@/services/flashSale";
import { Plus } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

type TDiscountModalProps = {
	selectedIds: string[] | [];
	setSelectedIds: Dispatch<SetStateAction<[] | string[]>>;
};

const DiscountModal = ({
	selectedIds,
	setSelectedIds,
}: TDiscountModalProps) => {
	const form = useForm();

	const {
		formState: { isSubmitting },
	} = form;

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		const modifiedData = {
			products: [...selectedIds],
			discountPercentage: parseFloat(data.discountPercentage),
		};

		try {
			const res = await addFlashSale(modifiedData);

			if (res?.success) {
				toast.success(res?.message);
				setSelectedIds([]);
			} else {
				toast.error(res?.message);
			}
		} catch (err: any) {
			console.error(err);
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button disabled={!selectedIds?.length} className="cursor-pointer">
					<span>Add Flash Sale</span> <Plus />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add Flash Sale</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="md:grid grid-cols-3 gap-4"
					>
						<FormField
							control={form.control}
							name="discountPercentage"
							render={({ field }) => (
								<FormItem className="col-span-2">
									<FormLabel>Discount Percentage</FormLabel>
									<FormControl>
										<Input type="number" {...field} value={field.value || ""} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" className="mt-5 w-full cursor-pointer">
							{isSubmitting ? "Adding...." : "Add"}
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default DiscountModal;

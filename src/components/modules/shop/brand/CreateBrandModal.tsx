"use client";
import { Button } from "@/components/ui/button";
import NMButton from "@/components/ui/core/NMButton";
import NMImageUploader from "@/components/ui/core/NMImageUploader";
import ImagePreviewer from "@/components/ui/core/NMImageUploader/ImagePreviewer";
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
import { createBrand } from "@/services/brand";
import { Plus } from "lucide-react";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const CreateBrandModal = () => {
	const [imageFiles, setImageFiles] = useState<File[] | []>([]);
	const [imagePreview, setImagePreview] = useState<string[] | []>([]);

	const form = useForm();
	const {
		formState: { isSubmitting },
	} = form;

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		try {
			const formData = new FormData();
			formData.append("data", JSON.stringify(data));
			formData.append("logo", imageFiles[0] as File);

			const res = await createBrand(formData);
			console.log(res);

			if (res?.success) {
				toast.success(res?.message);
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
				<NMButton btnLabel="Create Brand" btnIcon={<Plus />} />
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create Product Brand</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input type="text" {...field} value={field.value || ""} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex items-center justify-between mt-5">
							{imagePreview.length > 0 ? (
								<ImagePreviewer
									setImageFiles={setImageFiles}
									imagePreview={imagePreview}
									setImagePreview={setImagePreview}
									className="mt-6"
								/>
							) : (
								<div className="mt-6">
									<NMImageUploader
										setImageFiles={setImageFiles}
										setImagePreview={setImagePreview}
										label="Upload Icon"
									/>
								</div>
							)}
						</div>

						<Button type="submit" className="mt-5 w-full cursor-pointer">
							{isSubmitting ? "Creating...." : "Create"}
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default CreateBrandModal;

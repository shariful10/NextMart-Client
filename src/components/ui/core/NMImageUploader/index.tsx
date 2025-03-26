"use client";

import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { Input } from "../../input";

type TImageUploader = {
	label?: string;
	className?: string;
	setImageFiles: Dispatch<SetStateAction<File[]>>;
	setImagePreview: Dispatch<SetStateAction<string[]>>;
};

const NMImageUploader = () => {
	const [imageFiles, setImageFiles] = useState<File[] | []>([]);

	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files![0];
		setImageFiles((prev) => [...prev, file]);
	};

	return (
		<div>
			<Input
				onChange={handleImageChange}
				type="file"
				multiple
				accept="image/*"
				className="hidden"
				id="image-uploader"
			/>
			<label
				className="w-full h-36 md:size-36 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md cursor-pointer text-center text-sm text-gray-500 hover:bg-gray-50 transition"
				htmlFor="image-uploader"
			>
				Upload Logo
			</label>
		</div>
	);
};

export default NMImageUploader;

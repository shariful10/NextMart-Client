import { Dispatch, SetStateAction } from "react";

type TImangePreviewer = {
	setImageFiles: Dispatch<SetStateAction<File[]>>;
	imagePreview: string[];
	setImagePreview: Dispatch<SetStateAction<string[]>>;
	className?: string;
};

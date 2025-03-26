import { X } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { Button } from "../../button";

type TImagePreviewer = {
	setImageFiles: Dispatch<SetStateAction<File[]>>;
	imagePreview: string[];
	setImagePreview: Dispatch<SetStateAction<string[]>>;
	className?: string;
};

const ImagePreviewer = ({
	className,
	imagePreview,
	setImageFiles,
	setImagePreview,
}: TImagePreviewer) => {
	const handleRemove = (idx: number) => {
		setImageFiles((prev) => prev.filter((_, i) => i !== idx));
		setImagePreview((prev) => prev.filter((_, i) => i !== idx));
	};

	return (
		<div className={className}>
			{imagePreview.map((preview, idx) => (
				<div
					key={idx}
					className="relative w-36 h-36 rounded-md overflow-hidden border border-dashed border-gray-300"
				>
					<Image
						width={500}
						height={500}
						src={preview}
						alt={`Preview ${idx + 1}`}
						className="object-cover w-full h-full"
					/>
					<Button
						type="button"
						size="sm"
						onClick={() => handleRemove(idx)}
						className="bg-red-300 hover:bg-red-400 absolute -top-0 -right-0 w-6 h-6 p-0 rounded-full"
					>
						<X className="w-4 h-4" />
					</Button>
				</div>
			))}
		</div>
	);
};

export default ImagePreviewer;

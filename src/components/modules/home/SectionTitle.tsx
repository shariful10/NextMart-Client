import { Button } from "@/components/ui/button";
import Link from "next/link";

type TSectionTitle = {
	title: string;
	BtnUrl: string;
	BtnLabel: string;
};

const SectionTitle = ({ title, BtnUrl, BtnLabel }: TSectionTitle) => {
	return (
		<div className="flex items-center justify-between">
			<h2 className="font-bold text-3xl">{title}</h2>
			{BtnLabel && (
				<Link href={BtnUrl}>
					<Button variant="outline" className="rounded-full cursor-pointer">
						{BtnLabel}
					</Button>
				</Link>
			)}
		</div>
	);
};

export default SectionTitle;

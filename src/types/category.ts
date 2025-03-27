export type TCategory = {
	_id: string;
	name: string;
	icon: string;
	slug: string;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
	description: string;
	parent: TCategory | null;
};

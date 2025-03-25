export type TUser = {
	name: string;
	iat?: number;
	exp?: number;
	email: string;
	userId: string;
	hasShop?: boolean;
	isActive?: boolean;
	role: "user" | "admin";
};

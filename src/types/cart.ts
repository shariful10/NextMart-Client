export type TOrder = {
	products: TOrderProduct[];
	coupon?: string;
	shippingAddress: string;
	paymentMethod: string;
};

export type TOrderProduct = {
	product: string;
	quantity: number;
	color: string;
};

export type TCoupon = {
	shopId: string;
	orderAmount: number;
	couponCode: string;
};

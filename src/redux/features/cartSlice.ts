import { TProduct } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface TCartProduct extends TProduct {
	orderQuantity: number;
}

type TInitialState = {
	products: TCartProduct[];
	city: string;
	shippingAddress: string;
};

const initialState: TInitialState = {
	products: [],
	city: "",
	shippingAddress: "",
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addProduct: (state, action) => {
			const productToAdd = state.products.find(
				(product) => product._id === action.payload._id
			);

			if (productToAdd) {
				productToAdd.orderQuantity += 1;
				return;
			}

			state.products.push({ ...action.payload, orderQuantity: 1 });
		},
		incrementOrderQuantity: (state, action) => {
			const productToIncrement = state.products.find(
				(product) => product._id === action.payload
			);

			if (productToIncrement) {
				productToIncrement.orderQuantity += 1;
				return;
			}
		},
		decrementOrderQuantity: (state, action) => {
			const productToDecrement = state.products.find(
				(product) => product._id === action.payload
			);

			if (productToDecrement && productToDecrement.orderQuantity > 1) {
				productToDecrement.orderQuantity -= 1;
				return;
			}
		},
		removeProduct: (state, action) => {
			state.products = state.products.filter(
				(product) => product._id !== action.payload
			);
		},
		updateCity: (state, action) => {
			state.city = action.payload;
		},
		updateShippingAddress: (state, action) => {
			state.shippingAddress = action.payload;
		},
	},
});

//* Product
export const orderedProductsSelector = (state: RootState) => {
	return state.cart.products;
};

//* Payment
export const subTotalSelector = (state: RootState) => {
	return state.cart.products.reduce((acc, product) => {
		if (product.offerPrice) {
			return acc + product.offerPrice * product.orderQuantity;
		} else {
			return acc + product.price * product.orderQuantity;
		}
	}, 0);
};

//* Address
export const citySelector = (state: RootState) => {
	return state.cart.city;
};

export const shippingAddressSelector = (state: RootState) => {
	return state.cart.shippingAddress;
};

export const {
	updateCity,
	addProduct,
	removeProduct,
	updateShippingAddress,
	incrementOrderQuantity,
	decrementOrderQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;

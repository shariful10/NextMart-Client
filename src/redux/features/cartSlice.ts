import { TProduct } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface TCartProduct extends TProduct {
	orderQuantity: number;
}

type TInitialState = {
	products: TCartProduct[];
};

const initialState: TInitialState = {
	products: [],
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
	},
});

export const orderedProductsSelector = (state: RootState) => {
	return state.cart.products;
};

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;

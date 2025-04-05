import { TProduct } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type TInitialState = {
	products: TProduct[];
};

const initialState: TInitialState = {
	products: [],
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addProduct: (state, action) => {
			state.products.push(action.payload);
		},
	},
});

export const orderedProductsSelector = (state: RootState) => {
	return state.cart.products;
};

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;

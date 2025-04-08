import { configureStore } from "@reduxjs/toolkit";
import {
	FLUSH,
	PAUSE,
	PERSIST,
	persistReducer,
	PURGE,
	REGISTER,
	REHYDRATE,
} from "redux-persist";
import cartReducer from "./features/cartSlice";
import storage from "./storage";

const persistOptions = {
	key: "root",
	storage,
};

const persistedCart = persistReducer(persistOptions, cartReducer);

export const makeStore = () => {
	return configureStore({
		reducer: {
			cart: persistedCart,
		},
		middleware: (getDefaultMiddlewares: any) =>
			getDefaultMiddlewares({
				serializableCheck: {
					ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
				},
			}),
	});
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

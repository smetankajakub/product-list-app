import { createAction, createReducer, on } from "@ngrx/store";
import { ProductState } from "./product-state";

const initialState: ProductState = {
    products:[]
}

export const productReducer = createReducer(
	initialState,
	on(createAction('Substract'), (state) => {
		return {
			...state,
			showProductCode: !state.showProductCode
		};
	})
);

import {
	createFeatureSelector,
	createReducer,
	createSelector,
	on
} from '@ngrx/store';
import * as ProductActions from './product.actions';
import { ProductState } from './product.state';

const initialState: ProductState = {
	products: [],
	totalPrice: 0
};

const getProductFeatureState = createFeatureSelector<ProductState>('products');
export const productReducer = createReducer<ProductState>(
	initialState,
	on(
		ProductActions.updateProductsAndTotalPrice,
		(state, action): ProductState => {
			return {
				...state,
				products: action.products,
				totalPrice: action.totalPrice
			};
		}
	),

	on(ProductActions.loadProductsSuccess, (state, action): ProductState => {
        return {
			...state,
			products: action.products,
			totalPrice: action.totalPrice
		};
	})
);

export const getProducts = createSelector(
	getProductFeatureState,
	(state) => state.products
);

export const getTotalPrice = createSelector(
	getProductFeatureState,
	(state) => state.totalPrice
);

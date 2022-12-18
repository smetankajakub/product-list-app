import { createAction, props } from '@ngrx/store';
import { Product } from '../models/product';


export const loadProducts = createAction('[Product] Load products');
export const loadProductsSuccess = createAction('[Product] Load products success', props<{products: Product[], totalPrice: number}>());
export const updateProductsAndTotalPrice = createAction('[Product quantity] change', props<{products: Product[], totalPrice: number}>());

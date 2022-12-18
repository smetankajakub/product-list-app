import { Injectable } from '@angular/core';

import { mergeMap, map} from 'rxjs/operators';
import { ProductsService } from '../products.service';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductActions from './product.actions';

@Injectable()
export class ProductEffects {
	constructor(
		private actions$: Actions,
		private productsService: ProductsService
	) {}

	loadProducts$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(ProductActions.loadProducts),
			mergeMap(() =>
				this.productsService.getProducts().pipe(
					map((products) => {
                        console.log('in products')
                        let totalPrice = products.length > 0 ? products.map(p => p.price * p.quantity).reduce((prev, next) => prev + next) : 0;
                        console.log('totalPrice: ', totalPrice)
                        return ProductActions.loadProductsSuccess({ products, totalPrice })
                    })
				)
			)
		);
	});
}

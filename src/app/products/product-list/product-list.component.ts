import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Product } from '../models/product';
import { ProductsService } from '../products.service';
import * as ProductActions from '../state/product.actions';
import { getProducts, getTotalPrice } from '../state/product.reducer';
@Component({
	selector: 'app-product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
	sub$: Subscription = new Subscription();
	products$!: Subscription;
	products: Product[] = [];
	totalPrice$!: Observable<number>;

	constructor(private store: Store, private productService: ProductsService) {}

	ngOnInit(): void {
		this.products$ = this.store.select(getProducts).subscribe((products) => {
			this.products = products;
		});
		this.totalPrice$ = this.store.select(getTotalPrice);
		this.store.dispatch(ProductActions.loadProducts());
	}

	ngOnDestroy(): void {
		this.products$.unsubscribe();
	}

	updateQuantity(type: string, cloned: Product): void {
		let product: Product = { ...cloned };
		let products = [...this.products];

		const index = this.products.findIndex((p) => p.id === product.id);
		switch (type) {
			case 'add':
				product.quantity++;
				products[index] = product;
				break;
			case 'substract':
				product.quantity--;
				products[index] = product;
				if (products[index].quantity === 0) {
					products.splice(index, 1);
				}
				break;
		}

		let totalPrice = this.recalculateSum(products);
		this.store.dispatch(
			ProductActions.updateProductsAndTotalPrice({ products, totalPrice })
		);
	}

	recalculateSum(products: Product[]): number {
		let price = 0;
		products.forEach((p) => {
			price += p.price * p.quantity;
		});
		return price;
	}

  public deleteProduct(productId: number): void {
    const index = this.products.findIndex(product => product.id === productId);
    let products = [...this.products];
    products.splice(index, 1);

    
    let totalPrice = this.recalculateSum(products);
    this.store.dispatch(
			ProductActions.updateProductsAndTotalPrice({ products, totalPrice })
		);
  }
}

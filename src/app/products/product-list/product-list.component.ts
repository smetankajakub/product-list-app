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

	updateQuantity(type: string, productId: number): void {
    let products = [...this.products];
    this.productService.updateQuantity(type, productId, products);
	}

  public deleteProduct(productId: number): void {
    let products = [...this.products];
    this.productService.deleteProduct(productId, products);
  }
}

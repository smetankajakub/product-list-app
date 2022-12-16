import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Product } from '../models/product';
import { ProductsService } from '../products.service';

@Component({
	selector: 'app-product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
	sub$: Subscription = new Subscription();
	products: Product[] = [];
	constructor(private productService: ProductsService) {}

	ngOnInit(): void {
		this.sub$ = this.productService.getProducts().subscribe((data) => {
			this.products = data;
		});
	}

  ngOnDestroy(): void {
      this.sub$.unsubscribe();
  }

	updateQuantity(type: string, product: Product): void {
    const index = this.products.findIndex(i => i.id === product.id);
    console.log(index);
    console.log(this.products);
		switch (type) {
			case 'add':
				product.quantity++;
				break;
			case 'substract':
        product.quantity --;
        if (product.quantity === 0) {
					const index = this.products.findIndex(i => i.id === product.id);
          console.log(index);
					this.products.splice(index, 1);
				}
        break;
		}
	}
}

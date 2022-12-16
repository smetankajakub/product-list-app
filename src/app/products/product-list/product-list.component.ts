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
  totalPrice: number = 0;
  
  constructor(private productService: ProductsService) {}

	ngOnInit(): void {
		this.sub$ = this.productService.getProducts().subscribe((data) => {
			this.products = data;
      this.recalculateSum();
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
				this.products[index].quantity = product.quantity + 1;
        this.recalculateSum();
				break;
			case 'substract':
        this.products[index].quantity = product.quantity - 1;
        if (product.quantity === 0) {
					const index = this.products.findIndex(i => i.id === product.id);
          console.log(index);
					this.products.splice(index, 1);
				}
        this.recalculateSum();
        break;
		}
    
	}

  recalculateSum(): void {
    console.log('recalculateSum');

    this.totalPrice = this.products.length > 0 ? this.products.map(p => p.price).reduce((prev, next) => prev + next) : 0;
    console.log(this.totalPrice);
  };
}

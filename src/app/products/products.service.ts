import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Product } from './models/product';
import * as ProductActions from './state/product.actions';

@Injectable({
	providedIn: 'root'
})
export class ProductsService {
	constructor(private store: Store) {}

	getProducts(): Observable<Product[]> {
    const products: Product[] = [
      {
        id: 1,
        name: "Product 1",
        price: 1001.59,
        image: "https://via.placeholder.com/150",
        quantity: 1
      },
      {
        id: 2,
        name: "Product 2",
        price: 2099.99,
        image: "https://via.placeholder.com/150",
        quantity: 2
      },
      {
        id: 3,
        name: "Product with title case title ",
        price: 0,
        image: "https://via.placeholder.com/150",
        quantity: 2
      }
    ]
    return of(products);
  }

  updateQuantity(type: string, productId: number, products: Product[]): void {
    const index = products.findIndex((p) => p.id === productId);
    let product = {...products[index]};
    let wasRemoved = false;
		switch (type) {
			case 'add':
				product.quantity++;
				break;
			case 'substract':
				product.quantity--;
				if (product.quantity === 0) {
          wasRemoved = true;
					products.splice(index, 1);
				}
				break;
		}
    if(!wasRemoved){
      products[index] = product;
    }
		let totalPrice = this.recalculateSum(products);
		this.store.dispatch(
			ProductActions.updateProductsAndTotalPrice({ products, totalPrice })
		);
  }

  deleteProduct(productId: number, products: Product[]): void {
    const index = products.findIndex(product => product.id === productId);
    products.splice(index, 1);
  
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
}

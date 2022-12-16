import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from './models/product';

@Injectable({
	providedIn: 'root'
})
export class ProductsService {
	constructor() {}

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
      }
    ]
    return of(products);
  }
}

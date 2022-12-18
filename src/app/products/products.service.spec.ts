import { TestBed } from '@angular/core/testing';
import { Product } from './models/product';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ProductsService } from './products.service';
import { Store } from '@ngrx/store';

describe('ProductsService', () => {
  let service: ProductsService;
  let mockedProductes: Product[] = [
    {
      id: 1,
      name: "Product 1",
      price: 1000,
      image: "https://via.placeholder.com/150",
      quantity: 1
    },
    {
      id: 2,
      name: "Product 2",
      price: 2000,
      image: "https://via.placeholder.com/150",
      quantity: 2
    },
    {
      id: 3,
      name: "Product 3",
      price: 2000,
      image: "https://via.placeholder.com/150",
      quantity: 1
    }
  ]
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({})
      ]
    });
    service = TestBed.inject(ProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('[add] add quantity of product', () => {
    let productId = 1;
    service.updateQuantity('add', productId, mockedProductes);
    let index = mockedProductes.findIndex(product => product.id === productId);
    expect(mockedProductes[index].quantity).toEqual(2);
  });

  it('[substract] substract quantity of product', () => {
    let productId = 2;
    service.updateQuantity('substract', productId, mockedProductes);
    let index = mockedProductes.findIndex(product => product.id === productId);
    expect(mockedProductes[index].quantity).toEqual(1);
  });

  it('[substract] substract quantity from 1 to 0 remove from list', () => {
    let productId = 3;
    service.updateQuantity('substract', productId, mockedProductes);
    expect(mockedProductes.length).toEqual(2);
  });

  it('[remove] remove product from list', () => {
    let productId = 2;
    service.deleteProduct(productId, mockedProductes);
    expect(mockedProductes.length).toEqual(1);
  });  
});

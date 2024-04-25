import { IProduct } from './../Models/iproduct';
import { productsList } from './../Models/ProductsList';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: IProduct[];
  constructor() {
    this.products = productsList;
  }
  add(prod: IProduct): IProduct[] {
    this.products.push(prod);
    return this.products;
  }
  update(updatedProd: IProduct): IProduct[] | undefined {
    let originalIndex: number = this.products.findIndex(
      (p) => p.id == updatedProd.id
    );
    if (originalIndex != -1) {
      this.products[originalIndex] = updatedProd;
      return this.products;
    } else {
      return undefined;
    }
  }
  getById(id: number): IProduct | undefined {
    return this.products.find((p) => p.id == id);
  }
  remove(id: number): IProduct[] {
    this.products = this.products.filter((p) => p.id != id);
    return this.products;
  }
  getAll(): IProduct[] {
    return this.products;
  }
  getNewId(): number {
    return this.products[this.products.length - 1].id;
  }
}

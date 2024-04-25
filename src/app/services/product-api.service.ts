import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../Models/iproduct';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductApiService {
  baseURL: string = 'http://localhost:8099/products';
  constructor(private client: HttpClient) {}

  getById(id: number): Observable<IProduct> {
    return this.client.get<IProduct>(`${this.baseURL}/${id}`);
  }
  remove(id: number) {
    return this.client.delete(`${this.baseURL}/${id}`);
  }
  getAll(): Observable<IProduct[]> {
    return this.client.get<IProduct[]>(this.baseURL);
  }
  add(prod: any) {
    return this.client.post(`${this.baseURL}`, prod);
  }
  update(id: number, prod: any) {
    console.log('update from api');
    return this.client.put(`${this.baseURL}/${id}`, prod);
  }
  getNewId() {
    return 1;
  }
}

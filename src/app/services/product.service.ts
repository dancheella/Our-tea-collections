import { Injectable } from '@angular/core';
import {ProductType} from "../types/product.type";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }

  getProducts() : Observable<ProductType[]> {
    return this.http.get<ProductType[]>('https://testologia.site/tea');
  }

  getProduct(id: number): Observable <ProductType> {
    return this.http.get<ProductType>(`https://testologia.site/tea?id=${id}`);
  }

  searchProducts(query: string): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(`https://testologia.site/tea?search=${query}`);
  }

}

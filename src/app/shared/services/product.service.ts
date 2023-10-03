import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductType} from "../../../types/product.type";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }

  getProducts() : Observable<ProductType[]> {
    return this.http.get<ProductType[]>( environment.apiURL + 'tea');
  }

  getProduct(id: number): Observable <ProductType> {
    return this.http.get<ProductType>(environment.apiURL + `tea?id=${id}`);
  }

  searchProducts(query: string): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(environment.apiURL + `tea?search=${query}`);
  }
}

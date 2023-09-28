import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductType} from '../../../types/product.type';
import {ProductService} from '../../../services/product.service';
import {tap} from "rxjs";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: []
})
export class CatalogComponent implements OnInit {
  products: ProductType[] = [];
  loading: boolean = false;
  searchQuery: string = '';

  constructor(private productService: ProductService, private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['search'] || '';
      this.loadProducts();
    });
  }

  loadProducts() {
    this.loading = true;

    if (this.searchQuery) {
      this.productService.searchProducts(this.searchQuery)
        .pipe(
          tap(() => {
            this.loading = false;
          })
        )
        .subscribe({
          next: data => {
            this.products = Object.values(data);
          },
          error: (error) => {
            console.log(error);
            this.router.navigate(['/']);
          }
        });
    } else {
      this.productService.getProducts()
        .pipe(
          tap(() => {
            this.loading = false;
          })
        )
        .subscribe({
          next: data => {
            this.products = Object.values(data);
          },
          error: (error) => {
            console.log(error);
            this.router.navigate(['/']);
          }
        });
    }
  }
}

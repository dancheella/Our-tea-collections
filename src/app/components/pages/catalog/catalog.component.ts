import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductType} from '../../../types/product.type';
import {ProductService} from '../../../services/product.service';
import {Subscription, tap} from "rxjs";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: []
})
export class CatalogComponent implements OnInit, OnDestroy {
  products: ProductType[] = [];
  loading: boolean = false;
  searchQuery: string = '';
  private subscriptionRoute: Subscription | null = null;
  private subscriptionProducts: Subscription | null = null;


  constructor(private productService: ProductService, private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.subscriptionRoute = this.route.queryParams
      .subscribe(params => {
        this.searchQuery = params['search'] || '';
        this.loadProducts();
      });
  }

  ngOnDestroy() {
    this.subscriptionRoute?.unsubscribe();
    this.subscriptionProducts?.unsubscribe();
  }

  loadProducts() {
    this.loading = true;

    if (this.searchQuery) {
      this.subscriptionProducts = this.productService.searchProducts(this.searchQuery)
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

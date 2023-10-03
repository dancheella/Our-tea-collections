import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {ProductType} from "../../../../types/product.type";
import {ProductService} from "../../../shared/services/product.service";
import {TitleService} from "../../../shared/services/title.service";

declare var $: any;

@Component({
  selector: 'app-product-card',
  templateUrl: './product.component.html',
  styleUrls: []
})
export class ProductComponent implements OnInit, OnDestroy {

  product: ProductType;

  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private router: Router,
              private titleService: TitleService) {
    this.product = {
      id: 0,
      image: '',
      title: '',
      price: 0,
      description: ''
    }
  }

  private subscription: Subscription | null = null;

  ngOnInit() {

    $(".card-image").magnificPopup({
      type: 'image',
    });

    this.subscription = this.activatedRoute.params
      .subscribe((params) => {
        if (params['id']) {
          this.productService.getProduct(+params['id'])
            .subscribe({
              next: (data) => {
                this.product = data;
              },
              error: (err) => {
                this.router.navigate(['/']);
              }
            })
        }
      });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  addToTitle(title: string): void {
    this.titleService.product = title;
    this.router.navigate(['/order'])
  }
}

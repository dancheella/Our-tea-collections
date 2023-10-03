import {Component, Input, OnInit} from '@angular/core';
import {ProductType} from "../../../../types/product.type";

declare var $: any;

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: []
})
export class ProductCardComponent implements OnInit{
  @Input() product: ProductType;

  constructor() {
    this.product = {
      id: 0,
      image: '',
      title: '',
      price: 0,
      description: ''
    }
  }

  ngOnInit() {
    $(".card-image").magnificPopup({
      type: 'image',
    });
  }
}

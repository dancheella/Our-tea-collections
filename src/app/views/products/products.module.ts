import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProductsRoutingModule} from './products-routing.module';
import {CatalogComponent} from "./catalog/catalog.component";
import {ProductComponent} from "./product/product.component";
import {SharedModule} from "../../shared/shared.module";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    CatalogComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    ProductsRoutingModule
  ]
})
export class ProductsModule {
}

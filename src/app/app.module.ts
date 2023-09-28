import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HeaderComponent } from './components/common/header/header.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { MainComponent } from './components/pages/main/main.component';
import { CatalogComponent } from './components/pages/catalog/catalog.component';
import { OrderComponent } from './components/pages/order/order.component';
import { ProductCardComponent } from './components/common/product/product-card.component';
import {HttpClientModule} from "@angular/common/http";
import { ProductComponent } from './components/pages/product/product.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    CatalogComponent,
    OrderComponent,
    ProductCardComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlickCarouselModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

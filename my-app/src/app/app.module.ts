import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductAlertsComponent } from './product-alerts/product-alerts.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartService } from './cart.service';
import { ShippingComponent } from './shipping/shipping.component';
import { ShoesDetailsComponent } from './shoes-details/shoes-details.component';
import { BagsDetailsComponent } from './bags-details/bags-details.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ConditionsComponent } from './conditions/conditions.component';
import { OrderComponent } from './order/order.component';
import { OrderService } from './order.service';
import {DressComponent} from "./components/DressComponent/dress.component";
import {ProductComponent} from "./components/ProductComponent/product.component";
import {MainComponent} from "./components/MainComponent/main.component";
import {CartComponent} from "./components/CartComponent/cart.component";
import {LogInComponent} from "./components/LogInComponent/logIn.component";

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: MainComponent
      },
      {
        path: 'product/:type',
        component: ProductComponent
      },
      {
        path: 'logIn',
        component: LogInComponent
      }
    ])
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    ProductListComponent,
    ProductAlertsComponent,
    ProductDetailsComponent,
    ShoesDetailsComponent,
    BagsDetailsComponent,
    CartComponent,
    ShippingComponent,
    ShoesDetailsComponent,
    BagsDetailsComponent,
    PrivacyComponent,
    ConditionsComponent,
    OrderComponent,
    DressComponent,
    ProductComponent,
    MainComponent,
    LogInComponent
  ],
  bootstrap: [ AppComponent ],
  providers: [CartService, OrderService]
})
export class AppModule { }



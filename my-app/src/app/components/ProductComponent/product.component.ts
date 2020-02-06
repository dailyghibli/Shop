import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from "../../order.service";
import {ActivatedRoute} from "@angular/router";
import {Router} from "@angular/router";
import {NavigationEnd} from "@angular/router";

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {

  products: Array<any>;
  private subscrition;


  constructor(private orderService: OrderService, private route: ActivatedRoute, private router: Router) {
    orderService.getItems().subscribe(data => {
      this.products = data;
    });

    this.subscrition = this.router.events.subscribe((val: any) => {
      if (val instanceof NavigationEnd && val.url !== '') {
        this.getProductsByType();
      }
    });
  }

  addToCart(product){
    let currentCart = JSON.parse(localStorage.getItem("cart"));
    if (!currentCart){
      currentCart = [];
    }
    currentCart.push(product);
    localStorage.setItem("cart", JSON.stringify(currentCart));
  }

  getProductsByType(): void {
    let type = this.route.snapshot.paramMap.get("type");
    this.orderService.getSpecificTypeProduct(type);
  }

  ngOnInit(): void {
    this.getProductsByType();
  }

  ngOnDestroy(): void {
    this.subscrition.unsubscribe();
  }
}

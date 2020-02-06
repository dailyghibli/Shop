import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  items: Array<any>;
  sum: 0;

  constructor(public router: Router) {

  }

  calcSum(){
    this.sum = 0;
    for (let i=0;i<this.items.length; i++){
      this.sum+=parseInt(this.items[i].price);
    }
  }

  saveCart(){
    localStorage.setItem("cart", JSON.stringify(this.items));
  }

  removeFromCart(num){
    this.items.splice(num,1);
    this.saveCart();
    this.calcSum();
  }

  getCartItems(){
    let cart = localStorage.getItem("cart");
    this.items = JSON.parse(cart);
    this.calcSum();
  }



  ngOnInit(): void {
    this.getCartItems();
  }
}

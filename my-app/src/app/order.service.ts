import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  items = new BehaviorSubject<Array<any>>([]);

  constructor(
    private http: HttpClient
  ) { }

   addToCart(product){
    //this.items.push(product);
  }

  getItems(){
    return this.items.asObservable();
  }

  getAllProducts(){
    this.http.get("http://localhost:3000/showProducts", {}).subscribe( (data: Array<any>) => {
      this.items.next(data);
    })
  }

  getSpecificTypeProduct(type){
    this.http.get("http://localhost:3000/showProducts?type="+type, {}).subscribe( (data: Array<any>) => {
      this.items.next(data);
    })
  }


  clearCart(){
    //this.items = [];
    return this.items;
  }

  getShippingPrices(){
    return this.http.get('/assets/shipping.json');
  }

}

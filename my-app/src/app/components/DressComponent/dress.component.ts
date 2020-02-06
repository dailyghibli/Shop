import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../order.service";
import {Router} from "@angular/router";

@Component({
  selector: 'dress',
  templateUrl: './dress.component.html',
  styleUrls: ['./dress.component.css']
})
export class DressComponent implements OnInit {

  products: Array<any>;

  constructor(private orderService: OrderService, public router: Router) {
    orderService.getItems().subscribe( data => {
      this.products =data;
    })
  }

  ngOnInit(): void {
    this.orderService.getSpecificTypeProduct("dress");
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { bags } from '../bags';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-bags-details',
  templateUrl: './bags-details.component.html',
  styleUrls: ['./bags-details.component.css']
})

export class BagsDetailsComponent implements OnInit {

  private bag

  addToCart(bag) {
    window.alert('Your product has been added to the cart!');
    this.cartService.addToCart(bag);
  }
  constructor(
    private route: ActivatedRoute,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.bag = bags[+params.get('bagId')];
    })
  }

}

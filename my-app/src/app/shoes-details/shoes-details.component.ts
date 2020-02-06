import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { shoes } from '../shoes';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-shoes-details',
  templateUrl: './shoes-details.component.html',
  styleUrls: ['./shoes-details.component.css']
})
export class ShoesDetailsComponent implements OnInit {

  addToCart(shoe) {
    window.alert('Your product has been added to the cart!');
    this.cartService.addToCart(shoe);
  }

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService
    ) {}


  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      //this.shoe = shoes[+params.get('productId')];
    })
  }
}



import { Component } from '@angular/core';

import { products } from '../products';
import { shoes } from '../shoes';
import { bags } from '../bags';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products = products;
  shoes = shoes;
  bags = bags;

  share() {
    window.alert('The product has been shared!');
  }
  onNotify(){
    window.alert('You will be notified when the product goes on sale');
  }
}



import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { OrderService } from "../order.service";
import { CartService } from "../cart.service";


@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.css"]
})
export class OrderComponent implements OnInit {
  items;
  checkoutForm;

  constructor(
    private orderService: OrderService,
    private cartService: CartService,
    private formBuilder: FormBuilder
  ) {
    this.items = this.cartService.getItems();
    this.checkoutForm = this.formBuilder.group({
      name: "",
      address: ""
    });
  }
  onSubmit(customerData) {
    //Process checkout data here
    console.warn("Your order has been submitted", customerData);

    this.items = this.cartService.clearCart();
    this.checkoutForm.reset();
  }

  ngOnInit() {
    this.items = this.cartService.getItems();
  }
}

import { Component, OnInit } from '@angular/core';
import {ProductService} from '../shared/product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {

  cartProducts = []
  totalPrice = 0

  constructor(
    private productServ: ProductService
  ) { }

  ngOnInit(): void {
    this.cartProducts = this.productServ.cartProducts;
    for (let i = 0; i < this.cartProducts.length; i++) {
      this.totalPrice += +this.cartProducts[i].price;
    }
  }

  removefromCart(cartProduct) {
    const index = this.cartProducts.indexOf(cartProduct);
    this.cartProducts.splice(index, 1);
    this.totalPrice -= cartProduct.price;
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products-cart',
  templateUrl: './products-cart.component.html',
  styleUrls: ['./products-cart.component.scss']
})
export class ProductsCartComponent implements OnInit {

  pro: number[]

  constructor() {
    this.pro = [1, 2, 3]
  }

  ngOnInit(): void {
  }

}

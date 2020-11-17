import { Component, OnInit } from '@angular/core';
import { MoreProductsService } from './more-products.service';

@Component({
  selector: 'app-more-products',
  templateUrl: './more-products.component.html',
  styleUrls: ['./more-products.component.scss']
})
export class MoreProductsComponent implements OnInit {

  constructor(private productservice: MoreProductsService) { }

  ngOnInit(): void {
    this.productservice.getMoreProducts().subscribe(resp => {
      console.log(resp
      );
    })
  }

}

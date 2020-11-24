import { Component, OnInit } from '@angular/core';
import { MoreProductsService } from './more-products.service';

@Component({
  selector: 'app-more-products',
  templateUrl: './more-products.component.html',
  styleUrls: ['./more-products.component.scss']
})
export class MoreProductsComponent implements OnInit {

  products: [];
  sortOptions: { label: string, value: string }[];
  sortOrder: number;
  sortField: string;
  sortKey: string;

  constructor(private productservice: MoreProductsService) { }

  ngOnInit(): void {
    this.productservice.getMoreProducts().subscribe(resp => {

      console.log(resp);
      this.products = resp.moreProducts;


    });
    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' }
    ];
  }
  onSortChange(event) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    }
    else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

}

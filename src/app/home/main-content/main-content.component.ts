import { Component, OnInit } from '@angular/core';
import { GetProductsService } from './get-products.service';
import { ResponsiveOptions, Product } from "./main";


@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {
  val = 4;
  products: Product[];
  responsiveOptions1: ResponsiveOptions[];
  responsiveOptions2: any[];
  images: {
    previewImageSrc: string,
    thumbnailImageSrc: string
  }[];

  constructor(private productService: GetProductsService) {
    this.responsiveOptions1 = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
    this.responsiveOptions2 = [
      {
        breakpoint: '1024px',
        numVisible: 5
      },
      {
        breakpoint: '960px',
        numVisible: 4
      },
      {
        breakpoint: '768px',
        numVisible: 3
      },
      {
        breakpoint: '560px',
        numVisible: 1
      }
    ];


  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((resp) => {
      console.log(resp);
      this.images = resp.images;
      this.products = resp.products;

    })

  }

}

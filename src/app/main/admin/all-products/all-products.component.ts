import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from '../sharedServices/product.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss'],
})
export class AllProductsComponent implements OnInit ,OnDestroy{
  products :any = [];
  isLoading = false;
  errSubs:Subscription;
  productSubs:Subscription;
  constructor(
    private productService:ProductService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.productService.getProducts();
    this.productSubs = this.productService.getAllProduct().subscribe(products=>{
      this.isLoading = false;
      this.products = products;
    });
    this.errSubs = this.productService.isError.subscribe(isError=>{
      this.isLoading = false
    })
  }

  onAddProduct(){
    this.router.navigate(['/main','admin','add-product']);
  }

  onDelete(id){
    this.productService.deleteProduct(id).subscribe(res=>{
      this.productService.getProducts();
    })

  }

  onEdit(id){
      this.router.navigate(['/main','admin','edit',id]);
  }

  ngOnDestroy(){
    this.errSubs.unsubscribe();
    this.productSubs.unsubscribe();
  }
}

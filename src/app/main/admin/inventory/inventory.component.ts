import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../sharedServices/product.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  products = [];
  isLoading = false;
  constructor(
    private productService:ProductService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.productService.getProducts();
    this.productService.getAllProduct().subscribe(res=>{
      this.isLoading = false;
      this.products = res;
    });
  }

 
  onDelete(id){
      this.productService.deleteProduct(id).subscribe(res=>{
      this.productService.getProducts();
    })

  }

  onEdit(id){
      this.router.navigate(['/main','admin','edit',id]);
  }
 
  onUpdateQuantity(id, quantity){
     if(!quantity) return;
     this.isLoading = false;
     this.productService.updateQuantity(id,quantity);

  }
  onFilter(filterString){
    this.isLoading = true;
    this.productService.onSearch(filterString);
  }

  onKeyup(value){
    if(!value)this.isLoading = true;
    if(value==="" || value === undefined)this.productService.getProducts();
  }
}

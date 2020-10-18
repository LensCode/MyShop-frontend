import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = environment.apiURL;
  private products = new Subject<any>();
  isError = new Subject<boolean>();
  constructor(private http:HttpClient,private router:Router) { }

  getAllProduct(){
    return this.products.asObservable();
  }

  //  Create Product
  createProduct(data){
    let product = new FormData();
        product.append('title',data.title);
        product.append('description',data.description);
        product.append('price',data.price);
        product.append('mrp',data.mrp);
        product.append('shippingCharge',data.shippingCharge);
        product.append('quantity',data.quantity);
        product.append('vendor',data.vendor);
        data.images.forEach(file=>{
          if(file)product.append('images',file);
        });
        data.propertyName.forEach(name=>{
          if(name)product.append('name',name);
        });
        data.valueName.forEach(value=>{
          if(value)product.append('value',value);
        });
        product.append('collections',data.collections);
        product.append('tags',data.tags);
        product.append('tax',data.tax);

    this.http.post<any>(`${this.url}/product/create`,product)
        .subscribe(res=>{
        this.router.navigate(['/main','admin','all-products']);
        },
        err=>this.isError.next(false)
        )}

// Get products
  getProducts(){
    this.http.get<any>(`${this.url}/product`)
              .subscribe(res=>{
                console.log(res.products)
                this.products.next(res.products);
              },
              err=>this.isError.next(false)
              )}

  // Delete Product
  deleteProduct(id){
   return this.http.delete(`${this.url}/product/${id}`);
  }

  // Get Product
  getProduct(id){
   return this.http.get<any>(`${this.url}/product/${id}`)
  }

  // Update product
  updateProduct(data){
    let  editProduct:any;
    let isTypeString = data.images.every(e=> typeof(e)==="string");
    if(!isTypeString ){
       editProduct = new FormData();
      editProduct.append('title',data.title);
      editProduct.append('description',data.description);
      editProduct.append('price',data.price);
      editProduct.append('mrp',data.mrp);
      editProduct.append('shippingCharge',data.shippingCharge);
      editProduct.append('quantity',data.quantity);
      editProduct.append('vendor',data.vendor);
      data.images.forEach(file=>{
        if(file)editProduct.append('images',file);
      });
      editProduct.append('collections',data.collections);
      editProduct.append('tags',data.tags);
      editProduct.append('tax',data.tax);
      editProduct.append('name',data.propertyName.filter(e=>e !== null));
      editProduct.append('value',data.valueName.filter(e=>e !== null));
    }else{
      editProduct = {
             title:data.title,
             description:data.description,
             images:data.images.filter(e=>e !== ""),
             price:data.price,
             mrp:data.mrp,
             shippingCharge:data.shippingCharge,
             tax:data.tax,
             quantity:data.quantity,
             name:data.propertyName.filter(e=>e !== null),
             value:data.valueName.filter(e=>e !== null),
             vendor:data.vendor,
             collections:data.collections,
             tags:data.tags,
      }
      
    }
     this.http.patch<any>(`${this.url}/product/${data.id}`,editProduct)
     .subscribe(res=>{
      this.getProducts();
      this.router.navigate(['/','main','admin','all-products']);
    },
    err=>this.isError.next(false)
    )}

    // Update Quantity of the product
    updateQuantity(id,quantity){
      console.log(quantity)
      this.http.patch<any>(`${this.url}/product/quantity/${id}`,{quantity})
      .subscribe(res=>{
        this.getProducts();
      },
      err=>this.isError.next(false)
      )};

      onSearch(product){
          this.http.get<any>(`${this.url}/product/search/${product}`)
                    .subscribe(res=>{
                      this.products.next(res.data);
                    },
                    err=>this.isError.next(false)
                    )}
      
    

}

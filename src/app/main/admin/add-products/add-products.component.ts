import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductService } from '../sharedServices/product.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss'],
})
export class AddProductsComponent implements OnInit , OnDestroy{
  selected= [];
  imgPreview = [];
  productId:string;
  productForm:FormGroup;
  submitted = false;
  isLoading = false;
  errSubs:Subscription;
  constructor(
    private fb:FormBuilder,
    private productService:ProductService,
    private route:ActivatedRoute,
    ){}

  ngOnInit(): void {
    this.isLoading = true;
    this.productForm = this.fb.group({
      title:['',[Validators.required]],
      description:['',[Validators.required]],
      images:this.fb.array([
        this.fb.control('')
      ]),
      mrp:[null,[Validators.required]],
      price:[null,[Validators.required]],
      tax:[null],
      quantity:[null,[Validators.required]],
      vendor:[null,[Validators.required]],
      collections:[null],
      tags:[null],
      shippingCharge:[null,[Validators.required]],
      propertyName:this.fb.array([
        this.fb.control(null)
      ]),
      valueName:this.fb.array([
        this.fb.control(null)
      ]),
      id:[null]
    });

    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      if(paramMap.has('id')){
        this.productId = paramMap.get('id');
        this.productService.getProduct(this.productId).pipe(map(res=>{
          this.isLoading = false;
           let data = res.product;
           this.imgPreview.push(...data.images);
           return {
             title:data.title,
             description:data.description,
             images:data.images,
             price:data.price,
             mrp:data.mrp,
             shippingCharge:data.shippingCharge,
             tax:data.tax,
             quantity:data.quantity,
             propertyName: data.variants.name,
             valueName:data.variants.value,
             vendor:data.vendor,
             collections:data.collections,
             tags:data.tags,
             id:data._id
           }
        })).subscribe(res=>{ 
          res.propertyName.map((el,i)=>{
            let names = this.fb.control(el);
            (<FormArray>this.productForm.get('propertyName')).insert(i,names);
          } );
          res.valueName.map((el,i)=>{
            let names = this.fb.control(el);
            (<FormArray>this.productForm.get('valueName')).insert(i,names);
          } );
          res.images.map((el,i)=>{
            let img = this.fb.control(el,Validators.required);
            (<FormArray>this.productForm.get('images')).insert(i,img);
          } );;
          this.productForm.patchValue({
            title:res.title,
             description:res.description,
             price:res.price,
             mrp:res.mrp,
             shippingCharge:res.shippingCharge,
             tax:res.tax,
             quantity:res.quantity,
             vendor:res.vendor,
             collections:res.collections,
             tags:res.tags,
             id:res.id
          });
        });
       
      }else{
        this.productId = null;
        this.isLoading = false;
      }
    });
   
    this.errSubs = this.productService.isError.subscribe(error=>{
      this.isLoading = false;
    })
  }


  onSubmit(){
    this.submitted = true;
    if(this.productForm.invalid) return;
    this.isLoading = true;
    if(this.productId === null) this.productService.createProduct(this.productForm.value);
    if(this.productId !== null) this.productService.updateProduct(this.productForm.value);
  }

  addImages(img){
    const image = this.fb.control(img,[ Validators.required,Validators.maxLength(3)]);
    (<FormArray>this.productForm.get('images')).push(image);
  }
  
  onAddVariants(){
    let names = this.fb.control(null);
    let values = this.fb.control(null);
   (<FormArray>this.productForm.get('propertyName')).push(names);
   (<FormArray>this.productForm.get('valueName')).push(values);
  }

 
  onDeleteImg(index){
    (<FormArray>this.productForm.get('images')).removeAt(index);
    this.imgPreview.splice(index,1);
  }
  OnRemoveVariants(index){
    (<FormArray>this.productForm.get('propertyName')).removeAt(index);
    (<FormArray>this.productForm.get('valueName')).removeAt(index)
  }


  onSelect(event){
    const files = event.target.files;
    if(files){
      for(let file of files){
       let reader = new FileReader();
       reader.onload = (e:any) => {
         if(this.productId) this.imgPreview = [];
          this.imgPreview.push(e.target.result);
          this.addImages(file);
       }
       reader.readAsDataURL(file);      
      }  
    }
  }

  ngOnDestroy(){
    this.errSubs.unsubscribe();
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CompanyService } from '../companyInfo.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit, OnDestroy {
  isLoading = false;
  companyInfo:FormGroup;
  companyDetails:any;
  submitted = false;
  unSubs:Subscription;
  errorSbus:Subscription;
  constructor(
    private fb:FormBuilder,
    private compService:CompanyService
    ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.companyInfo = this.fb.group({
      storeName:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      industry:['',[Validators.required]],
      phone:[null,[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      street:['',[Validators.required]],
      building:[''],
      city:['',[Validators.required]],
      pinCode:[null,[Validators.required]],
      state:['',[Validators.required]],
      country:['',[Validators.required]],
      id:[null]
    });

    this.compService.getCompanyDetails();
    this.unSubs = this.compService.companyInfo().subscribe(res=>{
      this.isLoading = false;
      this.companyDetails={...res[0]}
      this.companyInfo.setValue({
        storeName:this.companyDetails.storeName,
        email:this.companyDetails.email,
        industry:this.companyDetails.industry,
        phone:this.companyDetails.phone,
        street:this.companyDetails.street,
        building:this.companyDetails.building,
        city:this.companyDetails.city,
        pinCode:this.companyDetails.pinCode,
        state:this.companyDetails.state,
        country:this.companyDetails.country,
        id:this.companyDetails.id
      });
    });
    this.errorSbus = this.compService.isLoading.subscribe(d=>{
      if(!d) this.isLoading = d;
    })
  }


  onSubmit(){
    this.submitted = true;
    if(this.companyInfo.invalid) return;
    this.isLoading = true;
    console.log(this.companyInfo.get('storeName').value)
    if(this.companyInfo.get('id').value === null) this.compService.createCompany(this.companyInfo.value);
    if(this.companyInfo.get('id').value !== null) this.compService.updatecompanyDetails(this.companyInfo.value)
  }
 
  ngOnDestroy(){
    this.unSubs.unsubscribe();
    this.errorSbus.unsubscribe();
  }
}

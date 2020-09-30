import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Admin } from 'src/app/auth/admin.model';
import { AuthService } from 'src/app/auth/auth.service';
import { EmailUpdateComponent } from './email-update-dialog/email-update.component';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit , OnDestroy {

  userFormData:FormGroup;
  submitted = false;
  adminInfo:Admin;
  isLoading = false;
  adminSubs:Subscription;
  errorSubs:Subscription;
  constructor(
    private dialog: MatDialog,
    private fb:FormBuilder,
    private authService:AuthService
    ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.authService.getAdmin();
    this.userFormData = this.fb.group({
      name:[,[Validators.required]],
      phone:[null, [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      image:['']
    });
    this.adminSubs = this.authService.getAdminDetails().subscribe(res=>{
    this.isLoading = false;
    this.userFormData.setValue({
       name:res.name,
       phone:res.phone,
       image:res.image?res.image:''
     });
     this.adminInfo = res;
    });

    this.errorSubs = this.authService.isError.subscribe(status=>{
      if(!status) this.isLoading = status;
    })
  }
  onSelectFile(event:Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.userFormData.patchValue({image:file});
    this.userFormData.get('image').updateValueAndValidity();
  }
  onSubmit(){
    this.submitted = true;
    if(this.userFormData.invalid) return;
    this.isLoading = true;
    this.authService.updateAdmin(this.userFormData.value)

  }
  onEmailUpdate(){
    this.dialog.open(EmailUpdateComponent)
  }

  ngOnDestroy(){
    this.adminSubs.unsubscribe();
    this.errorSubs.unsubscribe();
  }
}

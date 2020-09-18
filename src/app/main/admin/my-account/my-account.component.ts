import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EmailUpdateComponent } from './email-update-dialog/email-update.component';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  userFormData:FormGroup;
  submitted = false;
  userInfo = {firstName:'Absar',lastName:'Khan',email:'absark178@gmail.com',phone:9889328107}
  constructor(
    private dialog: MatDialog,
    private fb:FormBuilder
    ) { }

  ngOnInit(): void {
    this.userFormData = this.fb.group({
      firstName:[this.userInfo.firstName,[Validators.required]],
      lastName:[this.userInfo.lastName,[Validators.required]],
      phone:[this.userInfo.phone],
    })
  }
  onSelectFile(event:Event){
    const file = (event.target as HTMLInputElement).files[0]
    console.log(file)
  }
  onSubmit(){
    this.submitted = true;
    if(this.userFormData.invalid) return;
    console.log(this.userFormData.value)

  }
  onEmailUpdate(){
    this.dialog.open(EmailUpdateComponent)
  }

}

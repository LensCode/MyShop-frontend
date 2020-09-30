import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  isVisible = false;
  type = 'password';
  signup:FormGroup;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService:AuthService
    ) { }

  ngOnInit(): void {
    this.signup = this.formBuilder.group({
      name:['',[Validators.required]],
      email:['',[Validators.email,Validators.required]],
      password:['',[Validators.required, Validators.minLength(6)]],
      phone:['',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
    }
    );
  }

  onVisible(){
    this.isVisible = !this.isVisible;
    this.isVisible === true? this.type = 'text': this.type = 'password';
  }
  
 
  onSignup(){
    this.submitted = true;
    if(this.signup.invalid) return;
    this.authService.createAdmin(this.signup.value);
  }
}

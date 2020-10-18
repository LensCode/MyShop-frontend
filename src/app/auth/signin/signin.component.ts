import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  isVisible = false;
  type = 'password';
  loginForm:FormGroup;
  submitted = false;
  isLoading = false;
  constructor(
    private fb:FormBuilder,
    private authService:AuthService
    ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email:['',[Validators.email,Validators.required]],
      password:['',[Validators.required, Validators.minLength(6)]]
    });

    this.authService.isError.subscribe(isError=>{
      this.isLoading = false;
    });
  }

  onVisible(){
    this.isVisible = !this.isVisible;
    this.isVisible === true? this.type = 'text': this.type = 'password';
  }

  onLogin(){
    this.submitted = true;
    if(this.loginForm.invalid)return;
    this.isLoading = true;
    this.authService.login(this.loginForm.value);
  }
}

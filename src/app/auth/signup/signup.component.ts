import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from '../helper';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  isVisible = false;
  isVisible2 = false;
  type = 'password';
  signup:FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.signup = this.formBuilder.group({
      email:['',[Validators.email,Validators.required]],
      password:['',[Validators.required, Validators.minLength(6)]],
      confirmPassword:['',[Validators.required]]
    },
    {
      validator: MustMatch('password', 'confirmPassword')
    }
    );
  }

  onVisible(){
    this.isVisible = !this.isVisible;
    this.isVisible === true? this.type = 'text': this.type = 'password';
  }
  onVisible2(){
    this.isVisible2 = !this.isVisible2;
    this.isVisible2 === true? this.type = 'text': this.type = 'password';
  }
 
  onSignup(form){
    this.submitted = true;
  }
}

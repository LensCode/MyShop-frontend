import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  isVisible = false;
  isVisible2 = false;
  type = 'password';
  constructor() { }

  ngOnInit(): void {
  }

  onVisible(){
    this.isVisible = !this.isVisible;
    this.isVisible === true? this.type = 'text': this.type = 'password';
  }
  onVisible2(){
    this.isVisible2 = !this.isVisible2;
    this.isVisible2 === true? this.type = 'text': this.type = 'password';
  }
 
}

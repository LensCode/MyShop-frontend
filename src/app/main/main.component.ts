import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
declare var $:any;
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  isLogin = false;
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    $('.example-container').ready(function(){
      $(".menu").click(function(){
        $("aside ").toggleClass("toggle");
      });
     
      $("mat-list-item").click(function(){
        $("aside").removeClass("toggle");
      });
      $(".main-content").click(function(){
        $("aside").removeClass("toggle");
      });
    });
    
   }

  }



import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $('.example-container').ready(function(){
      $(".menu").click(function(){
        $("aside ").toggleClass("toggle");
      });
     
      $("li").click(function(){
        $("aside").removeClass("toggle");
      });
      $(".main-content").click(function(){
        $("aside").removeClass("toggle");
      });
    });
   }

  }



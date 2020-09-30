import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { slider } from './app.animation';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slider]
})
export class AppComponent implements OnInit,OnDestroy {
 authSubs:Subscription;
 constructor(
  private auhtService:AuthService,
  private router:Router
  ){
    this.auhtService.autoAuthAdmin();
   }
 ngOnInit(){
     this.authSubs = this.auhtService.isAuthenticated.subscribe((state:boolean) =>{
      if(state){
        this.router.navigate(['/','main','admin','setting']);
      }else{
        this.router.navigate(['/','auth','login']);
      }
     })
     
     
  
}

ngOnDestroy(){
    this.authSubs.unsubscribe();
}

}

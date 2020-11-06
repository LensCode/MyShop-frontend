import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
    templateUrl:'./email-update.component.html',
    styleUrls:['./email-update.component.scss']
})

export class EmailUpdateComponent implements OnInit,OnDestroy {
    password:string;
    email:string;
    unSbus:Subscription;
    isLoading = false;
    constructor(private authService:AuthService){}

    ngOnInit(){
       this.unSbus = this.authService.isError.subscribe(status=>{
       if(!status) this.isLoading = status;
       })
    }
    onUpdate(){
        this.isLoading = true;
        this.authService.updateEmail({email:this.email,password:this.password});
    }
    ngOnDestroy(){
        this.unSbus.unsubscribe();
    }
}
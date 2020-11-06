import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerComponent } from './errorHandler/errorHandler.component';

@Injectable({providedIn:'root'})
export class ErrorInterceptor implements HttpInterceptor{
 
    constructor(public dialog: MatDialog) {}
    intercept(req:HttpRequest<any>,next:HttpHandler){
       return next.handle(req).pipe(
           catchError((error:HttpErrorResponse) =>{
               this.dialog.open(ErrorHandlerComponent,{data:{message:error.error.message}});
               console.error(error);
               return throwError(error);
           })
       )

    }
}
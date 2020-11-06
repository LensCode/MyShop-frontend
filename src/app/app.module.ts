import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './app.material.component';
import { AuthInterceptor } from './auth/auth-interceptot';
import { ErrorHandlerComponent } from './errorHandler/errorHandler.component';
import { ErrorInterceptor } from './errorHandler-interceptor';
@NgModule({
  declarations: [
    AppComponent,
    ErrorHandlerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptor,multi:true}
  ],
  entryComponents:[ErrorHandlerComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

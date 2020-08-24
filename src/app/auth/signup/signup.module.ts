import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import { MaterialModule } from 'src/app/app.material.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [SignupComponent],
  imports: [
    CommonModule,
    SignupRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class SignupModule { }

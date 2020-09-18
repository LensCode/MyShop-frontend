import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyAccountRoutingModule } from './my-account-routing.module';
import { MyAccountComponent } from './my-account.component';
import { MaterialModule } from 'src/app/app.material.component';
import { EmailUpdateComponent } from './email-update-dialog/email-update.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [MyAccountComponent,EmailUpdateComponent],
  imports: [
    CommonModule,
    MyAccountRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  entryComponents:[EmailUpdateComponent]
})
export class MyAccountModule { }

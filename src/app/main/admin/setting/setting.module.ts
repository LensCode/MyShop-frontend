import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './setting.component';
import { MaterialModule } from 'src/app/app.material.component';


@NgModule({
  declarations: [SettingComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SettingRoutingModule,
    MaterialModule
    
  ]
})
export class SettingModule { }

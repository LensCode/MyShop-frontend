import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { MaterialModule } from '../app.material.component';
import { SidenavComponent } from './sidenav/sidenav.component';

@NgModule({
  declarations: [MainComponent,SidenavComponent],
  imports: [CommonModule, MainRoutingModule, MaterialModule],
})
export class MainModule {}

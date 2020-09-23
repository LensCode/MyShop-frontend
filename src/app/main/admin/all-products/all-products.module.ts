import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllProductsRoutingModule } from './all-products-routing.module';
import { AllProductsComponent } from './all-products.component';
import { MaterialModule } from 'src/app/app.material.component';

@NgModule({
  declarations: [AllProductsComponent],
  imports: [CommonModule, AllProductsRoutingModule, MaterialModule],
})
export class AllProductsModule {}

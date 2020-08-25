import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddProductsRoutingModule } from './add-products-routing.module';
import { AddProductsComponent } from './add-products.component';
import { MaterialModule } from 'src/app/app.material.component';

@NgModule({
  declarations: [AddProductsComponent],
  imports: [CommonModule, AddProductsRoutingModule, MaterialModule],
})
export class AddProductsModule {}

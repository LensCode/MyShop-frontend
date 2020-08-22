import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddProductRoutingModule } from './add-product-routing.module';
import { AddProductComponent } from './add-product.component';
import { MaterialModule } from '../../../app/app.material.component';

@NgModule({
  declarations: [AddProductComponent],
  imports: [CommonModule, AddProductRoutingModule, MaterialModule],
})
export class AddProductModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddProductsRoutingModule } from './add-products-routing.module';
import { AddProductsComponent } from './add-products.component';
import { MaterialModule } from 'src/app/app.material.component';

// declaring quill
declare var Quill: any;

@NgModule({
  declarations: [AddProductsComponent],
  imports: [CommonModule, AddProductsRoutingModule, MaterialModule],
})
export class AddProductsModule {
  constructor() {
    var fontSizeStyle = Quill.import('attributors/style/size');
    fontSizeStyle.whitelist = ['24px', '48px', '100px', '200px'];
    Quill.register(fontSizeStyle, true);
  }
}

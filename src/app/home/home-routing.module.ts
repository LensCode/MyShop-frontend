import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { MoreProductsComponent } from './more-products/more-products.component';
import { MainContentComponent } from './main-content/main-content.component';
import { ProductsCartComponent } from './products-cart/products-cart.component';

const routes: Routes = [{
  path: '', component: HomeComponent,
  children: [{
    path: '', component: MainContentComponent
  }, { path: 'more', component: MoreProductsComponent },
  { path: 'cart', component: ProductsCartComponent }

  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

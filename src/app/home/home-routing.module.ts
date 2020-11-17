import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { MoreProductsComponent } from './more-products/more-products.component';
import { MainContentComponent } from './main-content/main-content.component';

const routes: Routes = [{
  path: '', component: HomeComponent,
  children: [{
    path: '', component: MainContentComponent
  }, { path: 'more', component: MoreProductsComponent }

  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MaterialModule } from '../app.material.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MainContentComponent } from './main-content/main-content.component';
import {RatingModule} from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { MoreProductsComponent } from './more-products/more-products.component';
import { ProductsCartComponent } from './products-cart/products-cart.component';

@NgModule({
  declarations: [HomeComponent, SidenavComponent, MainContentComponent, MoreProductsComponent, ProductsCartComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    RatingModule,
    FormsModule
  ]
})
export class HomeModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main.component';

const routes: Routes = [
  { path: '', component: MainComponent ,
    children:[
      {
        path:'admin',children:[
          {
            path:'inventory',
            loadChildren: () => import('./admin/inventory/inventory.module').then(m => m.InventoryModule)
          },
          { 
            path: 'general', 
            loadChildren: () => import('./admin/my-account/my-account.module').then(m => m.MyAccountModule) 
          },
          { 
            path: 'setting', 
            loadChildren: () => import('./admin/setting/setting.module').then(m => m.SettingModule) 
          },
          {
            path:'',
            redirectTo:'/main/admin/inventory',
            pathMatch:'full'
          }
        ]
      },
      {
        path:'',
        redirectTo:'/main/admin/inventory',
        pathMatch:'full'
      }
    ]}
  
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }

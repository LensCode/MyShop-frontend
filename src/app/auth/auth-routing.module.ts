import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';

const routes: Routes = [
  { 
    path: '',
    component: AuthComponent,
    children:[
      { 
        path: 'signup',
        loadChildren: () => import('./signup/signup.module').then(m => m.SignupModule) 
      },
      { 
        path: 'signin',
        loadChildren: () => import('./signin/signin.module').then(m => m.SigninModule) 
      },
      {
            path: '',
            redirectTo: '/auth/signin',
            pathMatch: 'full'
      }
    ]  
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

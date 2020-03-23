import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  LoginComponent, SignupComponent,CheckComponent
} from '../pages/index';

const appRoutes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'check', component: CheckComponent },
  {
    path: 'admin',
    // loadChildren: './modules/admin/admin.module#AdminModule',
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)

    // canActivate: [AuthGuard]
  },


  // otherwise redirect to
  { path: '', redirectTo: "/login", pathMatch: 'full' },
];


export const Routing = RouterModule.forRoot(appRoutes);

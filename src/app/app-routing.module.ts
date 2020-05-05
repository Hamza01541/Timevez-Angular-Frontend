import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import {
  LoginComponent
} from 'src/app/pages';
import { Role } from 'src/app/models/role';
import { NgModule } from '@angular/core';

const appRoutes: Routes = [

  { path: 'login', component: LoginComponent },

  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
    data: { role: Role.Admin },
    canActivate: [AuthGuard]
  },
  {
    path: 'employee',
    loadChildren: () => import('./modules/employee/employee.module').then(m => m.EmployeeModule),
    data: { role: Role.Employee },
    canActivate: [AuthGuard]
  },
  // otherwise redirect to
  { path: '', redirectTo: "/login", pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
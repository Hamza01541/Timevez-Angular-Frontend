import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import {
  LoginComponent, SignupComponent, timesheetComponent
} from '../pages/index';
import {Role} from 'src/app/models/role';

const appRoutes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'timesheet', component: timesheetComponent },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
    data: { role: Role.Admin },
    canActivate: [AuthGuard]
  },
  // otherwise redirect to
  { path: '', redirectTo: "/login", pathMatch: 'full' },
];


export const Routing = RouterModule.forRoot(appRoutes);

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Admin Components
import {
    AdminRootComponent,
    UserFormComponent,
    UserListComponent,
    AttendanceFormComponent,
    AttendanceListComponent,
    ChangePasswordComponent,
    DashboardComponent,
    ProfileComponent
} from "./components/index";


const routes: Routes = [
    {
        path: '',
        component: AdminRootComponent,
        children: [
            { path: '', redirectTo: "/dashboard", pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'user', component: UserListComponent },
            { path: 'user-form', component: UserFormComponent },
            { path: 'attendance-form', component: AttendanceFormComponent },
            { path: 'attendance', component: AttendanceListComponent },
            { path: 'change-password', component: ChangePasswordComponent },
            { path: 'profile', component: ProfileComponent },
            // otherwise redirect to home
            { path: '**', redirectTo: "dashboard" },
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
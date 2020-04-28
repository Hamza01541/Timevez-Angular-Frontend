import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Admin Components
import {
    EmployeeRootComponent,
    HistoryComponent,
    DashboardComponent,
    LeaveComponent,
    ChangePasswordComponent,
    ProfileComponent
} from "./components/index";


const routes: Routes = [
    {
        path: '',
        component: EmployeeRootComponent,
        children: [
            { path: '', redirectTo: "/dashboard", pathMatch: 'full' },
            { path: 'history', component: HistoryComponent },
            { path: 'change-password', component: ChangePasswordComponent },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'leave', component: LeaveComponent },
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
export class EmployeeRoutingModule { }  
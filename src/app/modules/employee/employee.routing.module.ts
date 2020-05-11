import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Employee Components
import {
    EmployeeRootComponent,
    HistoryComponent,
    DashboardComponent,
    LeaveComponent,
    ChangePasswordComponent,
} from "./components";

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
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Admin Components
import {
    EmployeeRootComponent, timesheetComponent,DashboardComponent
} from "./components/index";


const routes: Routes = [
    {
        path: '',
        component: EmployeeRootComponent,
        children: [
            { path: '', redirectTo: "/dashboard", pathMatch: 'full' },
            { path: 'timesheet', component: timesheetComponent },
            { path: 'dashboard', component: DashboardComponent },
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
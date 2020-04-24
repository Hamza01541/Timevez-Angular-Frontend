import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Admin Components
import {
    AdminRootComponent,
    UserListComponent,
    ChangePasswordComponent,
    DashboardComponent,
    ProfileComponent
} from "./components/index";


const routes: Routes = [
    {
        path: '',
        component: AdminRootComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'user', component: UserListComponent },
            { path: 'change-password', component: ChangePasswordComponent },
            { path: 'profile', component: ProfileComponent },
            // otherwise redirect to home
            { path: '', redirectTo: "dashboard", pathMatch: 'full' },
            { path: '**', redirectTo: "dashboard" },
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Admin Components
import {
    AdminIndexComponent,
    AdminRootComponent,
    UserFormComponent,
    UserListComponent,
    AttendanceFormComponent,
    AttendanceListComponent,
    RoleFormComponent, RoleListComponent
} from "./components/index";


const routes: Routes = [
    {
        path: '',
        component: AdminRootComponent,
        children: [
            { path: '', redirectTo: "/user", pathMatch: 'full' },
            { path: 'user', component: UserListComponent },
            { path: 'user-form', component: UserFormComponent },
            { path: 'attendence-form', component: AttendanceFormComponent },
            { path: 'attendence', component: AttendanceListComponent },
            { path: 'role-form', component: RoleFormComponent },
            { path: 'role', component: RoleListComponent },
            // otherwise redirect to home
            { path: '**', redirectTo: "user" },
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
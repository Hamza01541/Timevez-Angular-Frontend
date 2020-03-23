import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Admin Components
import {
    AdminIndexComponent,
    AdminRootComponent,
    UserFormComponent,
    UserListComponent,
    AttendenceFormComponent,
    AttendenceListComponent
} from "./components/index";


const routes: Routes = [
    {
        path: '',
        component: AdminRootComponent,
        children: [
            { path: '', redirectTo: "/user", pathMatch: 'full' },
            { path: 'user', component: UserListComponent },
            { path: 'user-form', component: UserFormComponent },
            { path: 'attendence-form', component: AttendenceFormComponent },
            { path: 'attendence', component: AttendenceListComponent },
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
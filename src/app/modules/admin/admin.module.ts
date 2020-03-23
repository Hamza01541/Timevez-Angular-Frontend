import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { A11yModule } from '@angular/cdk/a11y';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { AdminRoutingModule } from './admin.routing.module';
import {
    AdminIndexComponent,
    AdminRootComponent,
    UserFormComponent,
    UserListComponent,
    AttendenceFormComponent,
    AttendenceListComponent

} from "./components";


import { SharedModule } from '.././../../shared/shared.module';

@NgModule({
    declarations: [
        AdminIndexComponent,
        AdminRootComponent,
        UserFormComponent,
        UserListComponent,
        AttendenceFormComponent,
        AttendenceListComponent

    ],

    imports: [
        A11yModule,
        DragDropModule,
        ScrollingModule,
        CdkStepperModule,
        CdkTableModule,
        CdkTreeModule,
        MatCheckboxModule,
        AdminRoutingModule,
        HttpClientModule,
        NgbModule,
        SharedModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
    ],

    providers: [

    ],

})
export class AdminModule { }
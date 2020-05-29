import { NgModule } from '@angular/core';
// import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { A11yModule } from '@angular/cdk/a11y';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { EmployeeRoutingModule } from './employee.routing.module';
import {
    EmployeeRootComponent,
    DashboardComponent,
    HistoryComponent,
    LeaveComponent,
    ChangePasswordComponent,

} from "./components";

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    declarations: [
        EmployeeRootComponent,
        DashboardComponent,
        HistoryComponent,
        LeaveComponent,
        ChangePasswordComponent,
    ],

    imports: [
        A11yModule,
        DragDropModule,
        ScrollingModule,
        CdkStepperModule,
 
        CdkTableModule,
        CdkTreeModule,
        MatCheckboxModule,
        EmployeeRoutingModule,
        // HttpClientModule,
        NgbModule,
        SharedModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
    ],

    providers: [

    ],

})
export class EmployeeModule { }
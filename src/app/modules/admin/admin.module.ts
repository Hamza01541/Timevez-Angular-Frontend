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
import { AdminRoutingModule } from './admin.routing.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import {
    AdminRootComponent,
    UserListComponent,
    DashboardComponent,
    ChangePasswordComponent,
    ProfileComponent
} from "./components";
import { SharedModule } from 'src/app/shared/shared.module';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

@NgModule({
    declarations: [
        AdminRootComponent,
        UserListComponent,
        ChangePasswordComponent,
        DashboardComponent,
        ProfileComponent
    ],

    imports: [
        A11yModule,
        DragDropModule,
        PerfectScrollbarModule,
        ScrollingModule,
        CdkStepperModule,
        CdkTableModule,
        CdkTreeModule,
        MatCheckboxModule,
        AdminRoutingModule,
        // HttpClientModule,
        NgbModule,
        SharedModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule
    ],

    providers: [
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }

    ],

})
export class AdminModule { }
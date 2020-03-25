import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
//Toaster
import { ToastrModule } from 'ngx-toastr';
// Service
import {
  AlertService, LoaderService, UserService, RoleService, AttendanceService
} from 'src/app/core/services';

//Material Module Imports
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { RequestInterceptor } from 'src/app/core/interceptors';
import {
  RequestService,
  LocalStorageService
} from 'src/app/core/services/index';

//Shared Module
import {
  GridComponent,ConfirmationDialogueComponent
} from 'src/shared/components/index';

const SHARED_MODULES = [
  FormsModule,
  HttpModule,
  HttpClientModule,
  ReactiveFormsModule,
  MatAutocompleteModule,
  MatCheckboxModule,
  MatInputModule,
  MatFormFieldModule,
  MatTabsModule,
  MatDialogModule,
  MatStepperModule,
  CommonModule,
  NgSelectModule,
  ToastrModule.forRoot()
];

const SHARED_COMPONENTS = [
  //Shared Component
  GridComponent,
  ConfirmationDialogueComponent
];

const SHARED_SERVICES = [
  RequestService,
  LocalStorageService,
  AlertService,
  LoaderService,
  AttendanceService,
  RoleService,
  UserService
];

@NgModule({
  imports: [SHARED_MODULES],
  exports: [SHARED_MODULES, SHARED_COMPONENTS],
  declarations: [SHARED_COMPONENTS],
  providers: [SHARED_SERVICES,
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true }
  ],
})

export class SharedModule {

}

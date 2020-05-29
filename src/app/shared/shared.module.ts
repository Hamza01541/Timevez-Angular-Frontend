import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { RequestInterceptor } from 'src/app/core/interceptors';
import { GoogleChartsModule } from 'angular-google-charts';
import { BarChartComponent } from 'src/app/shared/components/bar-chart/bar-chart.component';

//auth Guard
import { AuthGuard } from 'src/app/core/guards';

//Toaster
import { ToastrModule } from 'ngx-toastr';
// Service
import {
  AlertService, LoaderService, UserService, AttendanceService, LeaveService, UserStatusService, CryptoService
} from 'src/app/core/services';

//shared Services 
import { UtilityService } from 'src/app/shared/services';

//Material Module Imports
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import {
  RequestService,
  LocalStorageService
} from 'src/app/core/services/index';

//Shared Component
import {
  GridComponent, ConfirmationDialogueComponent, SideNavBarComponent, PaginationComponent
} from 'src/app/shared/components';
import { RouterModule } from '@angular/router';

const SHARED_MODULES = [
  RouterModule,
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
  ToastrModule.forRoot(),
  GoogleChartsModule
];

const SHARED_COMPONENTS = [
  //Shared Component
  GridComponent,
  ConfirmationDialogueComponent,
  SideNavBarComponent,
  PaginationComponent,
  BarChartComponent
];

const SHARED_SERVICES = [
  RequestService,
  LocalStorageService,
  AlertService,
  LoaderService,
  AttendanceService,
  UserService,
  AuthGuard,
  LeaveService,
  UtilityService,
  UserStatusService,
  CryptoService
];

@NgModule({
  imports: [SHARED_MODULES],
  exports: [SHARED_MODULES, SHARED_COMPONENTS],
  declarations: [SHARED_COMPONENTS],
  providers: [SHARED_SERVICES, { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true }
  ],
})

export class SharedModule {

}

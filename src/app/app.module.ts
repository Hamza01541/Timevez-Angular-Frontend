
import { NgModule, ErrorHandler } from '@angular/core';
import { Routing } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { SharedModule } from '../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//OWL Data time
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

// Common Components
import {
  LoginComponent, SignupComponent,timesheetComponent
} from '../pages/index';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    timesheetComponent,
    
  ],
  imports: [
    SharedModule,
    BrowserAnimationsModule,  
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    Routing,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

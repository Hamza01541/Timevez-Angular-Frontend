
import { NgModule, ErrorHandler } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { SharedModule } from 'src/app/shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RequestInterceptor } from 'src/app/core/interceptors';


import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

//OWL Data time
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

// Common Components
import {
  LoginComponent
} from 'src/app/pages';

//Shared Module
import {
  LoaderComponent
} from 'src/app/shared/components';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoaderComponent
  ],
  imports: [
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [





  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

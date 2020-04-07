
import { NgModule, ErrorHandler } from '@angular/core';
import { Routing } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { SharedModule } from '../shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
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
} from 'src/shared/components/loader/loader.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoaderComponent
  ],
  imports: [
    SharedModule,
    BrowserAnimationsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    FontAwesomeModule,

    Routing,
  ],
  providers: [





  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

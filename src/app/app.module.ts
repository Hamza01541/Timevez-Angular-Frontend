
import { NgModule, ErrorHandler } from '@angular/core';
import * as Sentry from "@sentry/browser";
import { Routing } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { SharedModule } from '../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//OWL Data time
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

// Common Components
import {
  LoginComponent, SignupComponent,CheckComponent
} from '../pages/index';

/**
 * Integrates sentry key
 */
// Sentry.init({
//   dsn: environment.sentry_Dsn
// });

/**
  * Capture front-end errors and open dialogue box to allow Q.A to log errors in sentry.
  * @param {any} error Error to be logged in sentry.
  */
export class SentryErrorHandler implements ErrorHandler {
  handleError(error: any) {
    const eventId = Sentry.captureException(error.originalError || error);
    Sentry.showReportDialog({ eventId });
  }
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    CheckComponent,
    
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

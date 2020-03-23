import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export interface AlertState {
  type: string,
  message: string
}

@Injectable()
export class AlertService {
  private alertSubject = new Subject<AlertState>();
  private keepAfterNavigationChange = false;

  constructor(
    private router: Router,
    private toastr: ToastrService
  ) {
    // clear alert message on route change
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
          // only keep for a single location change
          this.keepAfterNavigationChange = false;
        } else {
          // clear alert
          this.alertSubject.next({ type: "", message: "" });
        }
      }
    });
  }

  info(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.alertSubject.next({ type: 'info', message: message });
  }

  success(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.alertSubject.next({ type: 'success', message: message });
  }

  error(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.alertSubject.next({ type: 'error', message: message });
  }

  getAlertState(): Observable<AlertState> {
    return this.alertSubject.asObservable();
  }

  // Toasters
  successToastr(message: string, disableTimeOut: boolean = false) {
    this.showToastr(message, 'success', disableTimeOut);
  }

  errorToastr(message: string, disableTimeOut: boolean = false) {
    this.showToastr(message, 'error', disableTimeOut);
  }

  warningToastr(message: string, disableTimeOut: boolean = false) {
    this.showToastr(message, 'warning', disableTimeOut);
  }

  infoToastr(message: string, disableTimeOut: boolean = false) {
    this.showToastr(message, 'information', disableTimeOut);
  }

  // type = 'success' || 'error' || 'warning'
  showToastr(message: string, type: string, disableTimeOut: boolean) {
    if (message && message.length > 0) {
      this.toastr[type](message, type, {
        disableTimeOut: disableTimeOut,
        timeOut: 3000,
        positionClass: 'toast-top-right',
        closeButton: false,
        tapToDismiss: true,
        progressBar: true,
        progressAnimation: "increasing",
      });
    }
  }
}
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
  ) {}

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
      // this.toastr[type](`${message}`, `${type.charAt(0).toUpperCase() + type.slice(1)}: `, {
      this.toastr[type](`${message}`, null, {
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
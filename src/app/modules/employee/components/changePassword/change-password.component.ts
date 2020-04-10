import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, LoaderService } from 'src/app/core/services/index';
import { changePassword } from "src/app/models/change-password";

@Component({
    selector: 'employee-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss']
})

export class ChangePasswordComponent {

    model: changePassword;

    constructor(
      private alertService: AlertService,
      private loaderService: LoaderService,
  
    ) {
      this.model = new changePassword();
  
    }
  
    ngOnInit() {
  
    }

    /**
   * Show loader
   */
  showLoader() {
    this.loaderService.show();
  }

  /**
   * Hide loader
   */
  hideLoader() {
    this.loaderService.hide();
  }
}
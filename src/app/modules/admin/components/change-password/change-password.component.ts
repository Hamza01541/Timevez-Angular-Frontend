import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, LoaderService, UserService } from 'src/app/core/services';
import { User } from "src/app/models";

@Component({
  selector: 'admin-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})

export class ChangePasswordComponent {
  user: User;

  constructor(
    private alertService: AlertService,
    private loaderService: LoaderService,
    private userService: UserService,

  ) {
    this.user = new User();
  }

  ngOnInit() {

  }

  changePassword() {
    this.userService.changePassword(this.user).subscribe(res => {
      this.alertService.successToastr('Password successfully changed.');

    }, error => {
      if (error && error.error && error.error.message) {
        this.alertService.errorToastr(error.error.message);
      }
    })
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
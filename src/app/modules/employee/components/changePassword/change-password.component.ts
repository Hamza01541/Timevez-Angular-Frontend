import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, LoaderService, UserService } from 'src/app/core/services/index';
import { User } from "src/app/models";

@Component({
  selector: 'employee-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  user: User;

  constructor(
    private alertService: AlertService,
    private loaderService: LoaderService,
    private userService: UserService,
    private router: Router
  ) {
    this.user = new User();
  }

  ngOnInit() {

  }

  /**
   * Change password for current user.
   */
  changePassword() {
    this.showLoader();
    this.userService.changePassword(this.user).subscribe(res => {
      this.hideLoader();
      this.alertService.successToastr(`Password has changed SuccessFully.`, false);
      this.router.navigate(['/employee/dasbhoard']);
    }, error => {
      this.alertService.successToastr(`${error.error.message}`, false);
    });
  }

  /**
 * Show loader.
 */
  showLoader() {
    this.loaderService.show();
  }

  /**
   * Hide loader.
   */
  hideLoader() {
    this.loaderService.hide();
  }
}
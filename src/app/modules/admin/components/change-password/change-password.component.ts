import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, LoaderService, UserService  } from 'src/app/core/services';
import { changePassword } from "src/app/models/change-password";

@Component({
    selector: 'admin-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss']
})

export class ChangePasswordComponent {

    model: changePassword;

    constructor(
      private alertService: AlertService,
      private loaderService: LoaderService,
      private userService: UserService,
  
    ) {
      this.model = new changePassword();
    }
  
    ngOnInit() {
  
    }

    changePassword(){
      this.model
      this.userService.changePassword(this.model).subscribe(res=>{

      },error=>{

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
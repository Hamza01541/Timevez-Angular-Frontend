import { Component, OnInit } from '@angular/core';
import { AlertService, LoaderService, UserService } from 'src/app/core/services';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { Role } from 'src/app/models/role';
import { Constants } from 'src/shared/constants';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  active: boolean = true;
  loginModel: any = { username: "", password: "" }
  logout: boolean = false;
  currentUser: any;
  constructor(
    private alertService: AlertService,
    private userService: UserService,
    private router: Router,
    private loaderService: LoaderService,
    private route: ActivatedRoute,
    private storageService: LocalStorageService,
  ) {
  }

  ngOnInit() {
console.log("*window:", window);
console.log("*window['__env']:", window['_env']);
    
    this.logout = this.route.snapshot.queryParams['logout'] || false;
    this.currentUser = this.storageService.get(Constants.currentUser);

    if (!this.logout) {
      this.checkRole(this.currentUser);
    }
    else {
      this.userService.logOut();
    }
  }

  login() {
    this.showLoader();
    this.userService.userLogin(this.loginModel).subscribe((user: any) => {
      this.alertService.successToastr("Successfully Logined", false);
      if (user && user.token) {
        this.storageService.set(Constants.currentUser, user);
        this.hideLoader();
        this.checkRole(user);
      }
    },
      error => {
        this.hideLoader();
        this.alertService.errorToastr("Invalid Email or Password", false);
      });

  }

  checkRole(user: any) {

    if (user && user.token && user.role) {
      if (user.role == Role.Admin) {
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.router.navigate(['/employee/dashboard'], { queryParams: { id: user.id } });
      }
    }
  }

  showLoader() {
    this.loaderService.show();
  }

  hideLoader() {
    this.loaderService.hide();
  }
}

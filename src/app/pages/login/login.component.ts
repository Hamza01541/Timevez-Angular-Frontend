import { Component, OnInit } from '@angular/core';
import { AlertService, LoaderService, UserService } from 'src/app/core/services';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { Role } from 'src/app/models/role';

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
    this.logout = this.route.snapshot.queryParams['logout'] || false;
    this.currentUser = this.storageService.get('currentUser');

    if (!this.logout) {
      this.checkRole(this.currentUser);
    }
    else {
      this.userService.logOut();
    }
  }

  login() {
    this.showLoader();
    this.userService.userLogin(this.loginModel).subscribe((result: any) => {
      this.alertService.successToastr("Logined", false);
      if (result && result.token) {
        this.storageService.set('currentUser', result);
        this.hideLoader();
        this.checkRole(result);
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
        this.router.navigate(['/admin/user']);
      } else {
        this.router.navigate(['/timesheet'], { queryParams: { id: user.id } });
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

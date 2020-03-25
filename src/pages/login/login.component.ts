import { Component, OnInit } from '@angular/core';
import { AlertService, LoaderService } from '../../app/core/services/index';



@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  active: boolean = true;
  loginModel: any = { Username: "", Password: "", active: this.active }

  constructor(
    private alertService: AlertService,
    private loaderService: LoaderService,
  ) {
  }

  ngOnInit() {
  

  }
  login() {
    this.alertService.successToastr("Logined", false);

  }


  showLoader() {
    this.loaderService.show();
  }

  hideLoader() {
    this.loaderService.hide();
  }
}

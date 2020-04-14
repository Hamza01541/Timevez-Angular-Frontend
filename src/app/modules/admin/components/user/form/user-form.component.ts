import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { signUp } from "src/app/models/signup";
import { UserService } from "src/app/core/services/index";
import { AlertService, LoaderService } from 'src/app/core/services/index';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  id: number;
  operation = "add";
  model: signUp;

  rolesTypes: any[];

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private loaderService: LoaderService,
    private router: Router,
  ) {
    this.model = new signUp();

  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'] || null;
      if (this.id) {
        this.showLoader();
        this.userService.getById(this.id).subscribe(user => {
          this.hideLoader();
          this.model = user.data;
          this.operation = "update";
        }, error => {
          this.hideLoader();
          this.alertService.errorToastr("Error in Getting User by Id", false)
        });
      }
    });

  }

  save() {
    this.showLoader();
    this.operation = this.id ? 'updateData' : 'addData';
    this.showLoader();
    this.userService[this.operation](this.model).subscribe(res => {
      this.hideLoader();
      this.alertService.successToastr(`SuccessFully ${this.operation} Of Role.`, false);
      this.router.navigate(['/admin/role']);
    });

  }

  showLoader() {
    this.loaderService.show();
  }

  hideLoader() {
    this.loaderService.hide();
  }
}


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { signUp, rolesType } from "src/app/models/signup";
import { UserService, RoleService } from "src/app/core/services/index";
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
    private roleService: RoleService,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private loaderService: LoaderService,
    private router: Router,
  ) {
    this.model = new signUp();

  }

  ngOnInit() {
    this.getRoles();
    this.route.queryParams.subscribe(params => {
      this.id = params['id'] || null;
      if (this.id) {
        this.showLoader();
        this.userService.getById(this.id).subscribe(res => {
          this.hideLoader();
          // this.model = res;
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
  getRoles() {
    this.roleService.getData().subscribe((roles: any) => {
      this.rolesTypes=[];
      roles.data.forEach(roles => {
        let temp = { "value": roles.id, "label": roles.name };
        this.rolesTypes.push(temp);
      })
    });
  }

  showLoader() {
    this.loaderService.show();
  }

  hideLoader() {
    this.loaderService.hide();
  }
}


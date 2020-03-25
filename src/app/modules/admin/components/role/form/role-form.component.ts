import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { role } from "src/app/models/role";
import { RoleService } from "src/app/core/services/index";
import { AlertService, LoaderService } from 'src/app/core/services/index';




@Component({
    selector: 'app-role-form',
    templateUrl: './role-form.component.html',
    styleUrls: ['./role-form.component.scss']
})
export class RoleFormComponent implements OnInit {

    id: number;
    operation = "add";
    model: role;

    rolesTypes: any[];

    constructor(
        private roleService: RoleService,
        private route: ActivatedRoute,
        private alertService: AlertService,
        private loaderService: LoaderService,
        private router: Router,
    ) {
        this.model = new role();
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.id = params['id'] || null;
            if (this.id) {
                this.showLoader();
                this.roleService.getById(this.id).subscribe(res => {
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
        this.roleService[this.operation](this.model).subscribe(res => {
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


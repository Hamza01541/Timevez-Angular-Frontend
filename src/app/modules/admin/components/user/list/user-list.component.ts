import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AlertService, LoaderService, UserService } from 'src/app/core/services/index';
import { GridComponent } from 'src/shared/components/index';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
    @ViewChild(GridComponent) gridComponent: GridComponent;

    jscolumnDefs: any[];
    users: any[];
    totalUsers: number;
    jsfilter: any = {};
    selectedRowId;
    isShowAdd: boolean = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
        private loaderService: LoaderService,
        public dialog: MatDialog) { }


    ngOnInit() {
        this.getGridData();
    }

    getGridData() {
        this.getColumnDefs();
        this.getUsers();
    }

    //initialize grid
    getColumnDefs() {
        const _this = this;
        this.jscolumnDefs = [
            {
                title: 'Name', name: "firstName", width: 75, itemTemplate: function (__, user) {
                    return `${user.firstName} ${user.lastName}`;
                }
            },
            { title: 'User Name', width: 92, name: 'username' },

            { title: 'CNIC', width: 44, name: 'CNIC' },
            { title: 'address', width: 50, name: 'address' },
            { title: 'Email', width: 92, name: 'email' },
            { title: 'Phone Number', width: 60, name: 'phoneNumber' },
            { title: 'Roles', width: 50, name: 'roles' },
            {
                title: 'Active', width: 50, name: 'active', itemTemplate: function (active) {
                    var iconClass = "";
                    if (active == true) {
                        iconClass = "fa fa-check";
                    }
                    else {
                        iconClass = "fa fa-close";
                    }
                    return $("<span>").attr("class", iconClass);
                }
            },
            {
                title: 'Action', width: 70, itemTemplate: (__, data) => {

                    console.log("data", data);
                    this.selectedRowId = data.id;
                    console.log("ttt", this.selectedRowId);
                    const updateIcon = $("<span data-toggle='tooltip' data-placement='bottom' title='Edit'>").append("<i class='fas fa-edit mr-3'  >").on("click", () => this.performCurdOperation('update', data.id));
                    const deleteIcon = $("<span data-toggle='tooltip' data-placement='bottom' title='Disabled'>").append("<i class='fa fa-ban mr-3'>").on("click", () => this.performCurdOperation('delete', data.id));
                    // const hardDeleteIcon = $("<span data-toggle='tooltip' data-placement='bottom' title='Delete'>").append("<i class='fas fa-trash-alt mr-3'>").on("click", () => this.openDialog());
                    return $("<span>").append(updateIcon).append(deleteIcon);
                }
            }

        ];
    }

    performCurdOperation(action, id) {
        console.log("action id", action, id);
        switch (action) {
            case 'update':
                // this.router.navigate(['/admin/user-form'], { queryParams: { id: this.selectedRowId } });
                break;
            case 'delete':
                this.showLoader();
                this.userService.deleteData(id).subscribe(res => {
                    this.hideLoader();
                    this.alertService.successToastr("Selected User Disabled Successfully.", false);
                    this.gridComponent.deleteRowListener(id);
                }, error => {
                    this.hideLoader();
                    this.alertService.errorToastr("Error in Deleting User.", false);
                });
                break;
        }
    }

    /**
     * Open confirmation dialogue.
     * On confirmation, deletes selected row of grid.
     */
    //   openDialog() {
    //     const dialogRef = this.dialog.open(ConfirmationDialogueComponent, {
    //       width: '250px',
    //       data: {
    //         message: 'Want to Delete Data?'
    //       }
    //     });

    // if (dialogRef) {
    //   dialogRef.afterClosed().subscribe(result => {
    //     if (result) {
    //       this.performCurdOperation('hardDelete', this.selectedRowId);
    //     }
    //   });
    // }
    //   }

    getUsers(pageindex: number = 1) {

        this.showLoader();
        this.userService.getData().subscribe((users: any) => {
            console.log("users", users);
            this.hideLoader();
            this.users = users.data;
            this.totalUsers = users.total;
        }, error => {
            this.hideLoader();
            this.alertService.errorToastr("Error in Getting Users.", false);
        });
    }

    performOperation(event: any) {
        switch (event.action) {
            case 'add':
                this.router.navigate(['/admin/user-form']);
                break;
        }
    }

    showLoader() {
        this.loaderService.show();
    }

    hideLoader() {
        this.loaderService.hide();
    }
}

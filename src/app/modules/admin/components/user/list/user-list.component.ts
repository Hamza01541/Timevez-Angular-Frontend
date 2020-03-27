import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AlertService, LoaderService, UserService } from 'src/app/core/services/index';
import { GridComponent, ConfirmationDialogueComponent } from 'src/shared/components/index';

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

    /**
         * Call the Column and Users.
         */
    getGridData() {
        this.getColumnDefs();
        this.getUsers();
    }

    /**
      * Initializing the Grid with Data
      */
    getColumnDefs() {
        let _this = this;
        this.jscolumnDefs = [
            {
                title: 'Name', name: "firstName", width: 121, itemTemplate: function (__, user) {
                    return `${user.firstname} ${user.lastname}`;
                }
            },
            { title: 'User Name', width: 48, name: 'username' },
            { title: 'CNIC', width: 77, name: 'CNIC' },
            { title: 'address', width: 118, name: 'address' },
            { title: 'Email', width: 117, name: 'email' },
            { title: 'Phone Number', width: 65, name: 'phone' },
            {
                title: 'Active', width: 34, name: 'active', itemTemplate: function (active) {
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
                title: 'Action', width: 70, name: "username", itemTemplate: (__, user) => {
                    this.selectedRowId = user.id;
                    const updateIcon = $("<span data-toggle='tooltip' data-placement='bottom' title='Edit'>").append("<i class='fa fa-pencil-square-o mr-3'  >").on("click", () => this.performCurdOperation('update', user.id));
                    const deleteIcon = $("<span data-toggle='tooltip' data-placement='bottom' title='Disabled'>").append("<i class='fa fa-trash-o mr-3'>").on("click", () => this.openDialog());
                    return $("<span>").append(updateIcon).append(deleteIcon);
                }
            }
        ];
    }

    /**
     * Perform Update or Delete Operation..
     */
    performCurdOperation(action, id) {
        switch (action) {
            case 'update':
                // this.router.navigate(['/admin/user-form'], { queryParams: { id: this.selectedRowId } });
                break;
            case 'delete':
                this.showLoader();
                this.userService.deleteData(id).subscribe(res => {
                    this.hideLoader();
                    this.alertService.successToastr("Selected User Deleted Successfully.", false);
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
    openDialog() {
        const dialogRef = this.dialog.open(ConfirmationDialogueComponent, {
            width: '250px',
            data: {
                message: 'Want to Delete Data?'
            }
        });

        if (dialogRef) {
            dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    this.performCurdOperation('delete', this.selectedRowId);
                }
            });
        }
    }

    /**
     * Get Users on the base of page index.
     */
    getUsers(pageindex: number = 1) {
        this.showLoader();
        this.userService.getPagedUsers(pageindex).subscribe((users: any) => {
            this.hideLoader();
            this.users = users.data;
            this.totalUsers = users.total;
        }, error => {
            this.hideLoader();
            this.alertService.errorToastr("Error in Getting Users.", false);
        });
    }

    /**
         * Perform Add Operation
         */
    performOperation(event: any) {
        switch (event.action) {
            case 'add':
                this.router.navigate(['/admin/user-form']);
                break;
        }
    }

    /**
     * Show the loader screen
     */
    showLoader() {
        this.loaderService.show();
    }

    /**
     * Hide the Loader Screen
     */
    hideLoader() {
        this.loaderService.hide();
    }
}

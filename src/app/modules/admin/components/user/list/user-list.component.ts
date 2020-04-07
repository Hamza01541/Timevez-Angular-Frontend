import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AlertService, LoaderService, UserService, AttendanceService } from 'src/app/core/services/index';
import { GridComponent, ConfirmationDialogueComponent } from 'src/shared/components/index';
import { signUp, rolesType } from "src/app/models/signup";
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';


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
    allUsers: any[];
    jsfilter: any = {};
    selectedRowId;
    isShowAdd: boolean = false;

    public config: PerfectScrollbarConfigInterface = { suppressScrollX: false };

    model: signUp;
    id: number;
    operation = "add";
    selected: any = {};
    userAttendance: any = [];

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
        private attendanceService: AttendanceService,
        private loaderService: LoaderService,
        public dialog: MatDialog) {
        this.model = new signUp();

    }

    ngOnInit() {
        this.getGridData();
    }



    save() {
        this.showLoader();
        this.operation = this.id ? 'updateData' : 'addData';
        this.showLoader();
        this.userService[this.operation](this.model).subscribe(res => {
            this.hideLoader();
            this.alertService.successToastr(`SuccessFully ${this.operation} Of Users.`, false);
            this.router.navigate(['/admin/user']);
        });

    }


    /**
         * Call the Column and Users.
         */
    getGridData() {
        // this.getColumnDefs();
        this.getAllUser();
    }

    /**
      * Initializing the Grid with Data
      */
    getColumnDefs() {
        let _this = this;
        this.jscolumnDefs = [
            {
                title: 'Name', name: "fullname", width: 75, itemTemplate: function (__, user) {
                    return `${user.firstname} ${user.lastname}`;
                }
            },
            { title: 'Username', width: 92, name: 'username' },
            { title: 'CNIC', width: 44, name: 'CNIC' },
            { title: 'Address', width: 50, name: 'address' },
            { title: 'Email', width: 92, name: 'email' },
            { title: 'Phone', width: 60, name: 'phone' },
            { title: 'Role', width: 50, name: 'role' },
            {
                title: 'Active', width: 34, name: 'active', itemTemplate: function (active) {
                    var iconClass = "";
                    var iconStyle = "";
                    if (active == true) {
                        iconClass = "fa fa-check";
                        iconStyle = "color:green";
                    }
                    else {
                        iconClass = "fa fa-close";
                        iconStyle = "color:red"
                    }
                    return $("<span>").attr("class", iconClass).attr("style", iconStyle);
                }
            },
            {
                title: 'Action', width: 70, name: "username", itemTemplate: (__, data) => {
                    const updateIcon = $("<span data-toggle='tooltip' data-placement='bottom' title='Edit'>").append("<i class='fa fa-pencil-square-o mr-3'  >").on("click", () => this.performCurdOperation('update', data._id));
                    const deleteIcon = $("<span data-toggle='tooltip' data-placement='bottom' title='Disabled'>").append("<i class='fas fa-trash-alt mr-3'>").on("click", () => this.openDialog(data._id));
                    return $("<span>").append(updateIcon).append(deleteIcon);
                }
            }
        ];
    }

    /**
     * Perform Update or Delete Operation..
     */
    performCurdOperation(action: string, selectedRowId: number) {
        switch (action) {
            case 'update':
                this.router.navigate(['/admin/user-form'], { queryParams: { id: selectedRowId } });
                break;
            case 'delete':
                this.showLoader();
                this.userService.deleteData(selectedRowId).subscribe(res => {
                    this.hideLoader();
                    this.alertService.successToastr("Selected User Deleted Successfully.", false);
                    this.gridComponent.deleteRowListener(selectedRowId);
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
    openDialog(selectedRowId: number) {
        const dialogRef = this.dialog.open(ConfirmationDialogueComponent, {
            width: '250px',
            data: {
                message: 'Want to Delete Data?'
            }
        });

        if (dialogRef) {
            dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    this.performCurdOperation('delete', selectedRowId);
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
            // this.users = users.data;

            this.getUserAttendance(this.selected._id);
            this.totalUsers = users.total;
        }, error => {
            this.hideLoader();
            this.alertService.errorToastr("Error in Getting Users.", false);
        });
    }


    getAllUser() {
        this.userService.getData().subscribe((users: any) => {
            this.selected = users.data[0];
            this.allUsers = users.data;
            this.getUserAttendance(this.selected._id);
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

    getUserAttendance(userId) {
        let pageindex: number = 1
        this.attendanceService.getUserAttendance(pageindex, userId).subscribe((attendance: any) => {
            this.userAttendance = attendance;
        });
    }


    getAvailableTime(attendance) {
        var timeDiff = new Date(attendance.checkOut).getTime() - new Date(attendance.checkIn).getTime();

        if (attendance.breakStartTime && attendance.breakEndTime) {
            var breakDiff = new Date(attendance.breakEndTime).getTime() - new Date(attendance.breakStartTime).getTime();
            timeDiff = timeDiff - breakDiff;
        }

        return timeDiff;
    }


    getUserDetails(userDetails) {
        this.selected = userDetails;
        this.getUserAttendance(this.selected._id);
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

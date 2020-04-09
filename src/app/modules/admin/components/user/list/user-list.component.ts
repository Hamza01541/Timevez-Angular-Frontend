import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AlertService, LoaderService, UserService, AttendanceService } from 'src/app/core/services/index';
import { GridComponent, ConfirmationDialogueComponent } from 'src/shared/components/index';
import { signUp, } from "src/app/models/signup";
import { attendence } from "src/app/models/attendence";
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import flatpickr from "flatpickr";
declare var jQuery: any;

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
    public config: PerfectScrollbarConfigInterface = { suppressScrollX: false };

    // Max moment: January 1 2020, 20:30
    public min = new Date(2020, 0, 1, 10, 30);
    // Max moment: April 1 2020, 20:30
    public max = new Date(2020, 3, 1, 20, 30);
    //First day of week starts from Monday on Value 1
    firstDayofWeek = 1;
    //12 Hour Timer Set if true
    hour12Timer = true;
    //Picker Mode Opening style of Time Picker Like, (Default)PopUp & Dialog
    pickerMode = "popup";

    model: signUp;
    modelAttendance: attendence
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
        this.modelAttendance = new attendence();
    }

    ngOnInit() {
        this.getAllUser();
    }



    save(type: string) {

        if (type == 'attendance') {
            this.showLoader();
            this.operation = this.id ? 'updateData' : 'addData';
            this.showLoader();
            this.attendanceService[this.operation](this.modelAttendance).subscribe(res => {
                this.hideLoader();
                jQuery('#attendanceNewModal').modal('hide');

                this.alertService.successToastr(`SuccessFully ${this.operation} Of Attendance.`, false);
            }, error => {
                this.hideLoader();
                this.alertService.errorToastr(`Error in ${this.operation} Attendance.`, false);
                jQuery('#attendanceNewModal').modal('show');
            });
        }
        else {
            this.showLoader();
            this.operation = this.id ? 'updateData' : 'addData';
            this.showLoader();
            this.userService[this.operation](this.model).subscribe(res => {
                this.hideLoader();
                jQuery('#clientNewModal').modal('hide');
                this.alertService.successToastr(`SuccessFully ${this.operation} Of User.`, false);
            }, error => {
                this.hideLoader();
                jQuery('#clientNewModal').modal('show');
                this.alertService.errorToastr(`Error in ${this.operation} User.`, false);
            });
        }
    }

  

    filterAttendance(event) {
        if (event.target.value) {
            if (event.target.value == "custom") {
                console.log("selection is", event.target.value);
            }
            else {


            }

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
                    // this.performCurdOperation('delete', selectedRowId);
                }
            });
        }
    }

    getAllUser() {
        this.userService.getData().subscribe((users: any) => {
            this.selected = users.data[0];
            this.allUsers = users.data;
            this.getUserAttendance(this.selected._id);
        });
    }

    /**
         * Performed delete and update Operation
         */
    performOperation(type: string, operation: string, Id: any) {
        if (type == 'user') {
            if (operation == 'delete') {
                this.showLoader();
                this.userService.deleteData(Id).subscribe(res => {
                    this.hideLoader();
                    this.alertService.successToastr("Selected User Deleted Successfully.", false);
                }, error => {
                    this.hideLoader();
                    this.alertService.errorToastr("Error in Deleting Selected User.", false);
                });
            }
            else if (operation == 'edit') {
                this.id = Id;
                jQuery('#clientNewModal').modal('show');
                this.userService.getById(Id).subscribe(res => {
                    this.model = res.data;
                });
            }
        }
        else {
            if (operation == 'delete') {
                debugger;
                this.showLoader();
                this.attendanceService.deleteData(Id).subscribe(res => {
                    this.hideLoader();
                    this.alertService.successToastr("Selected Attendance Deleted Successfully.", false);
                    location.reload();
                }, error => {
                    this.hideLoader();
                    this.alertService.errorToastr("Error in Deleting Selected Attendance.", false);
                });
            }
            else if (operation == 'edit') {
                this.id = Id;
                jQuery('#attendanceNewModal').modal('show');
                this.attendanceService.getById(Id).subscribe(res => {
                    this.attendanceService = res.data;
                });
            }
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

import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AlertService, LoaderService, UserService, AttendanceService } from 'src/app/core/services';
import { signUp, attendence} from "src/app/models";
import { filterModel, dateTypesEnum } from "src/app/models/filter";
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import flatpickr from "flatpickr";
declare var jQuery: any;

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

    public config: PerfectScrollbarConfigInterface = { suppressScrollX: false };

    model: signUp;
    modelAttendance: attendence;
    attendanceFilterModel: filterModel;
    allUsers: any[];


    attendanceTypes: any[] = [
        { value: dateTypesEnum.currentDate, name: 'Current Date' },
        { value: dateTypesEnum.currentMonth, name: 'Current Month' },
        { value: dateTypesEnum.lastMonth, name: 'Last Month' },
        { value: dateTypesEnum.currentYear, name: 'Current Year' },
        { value: dateTypesEnum.lastYear, name: 'Last Year' },
        { value: dateTypesEnum.custom, name: 'Custom' }
    ];


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
        this.attendanceFilterModel = new filterModel();
    }

    ngOnInit() {
        this.attendanceFilterModel.type = dateTypesEnum.currentDate;
        this.flatPickrInit();
        this.getAllUser();
    }

    flatPickrInit() {
        const date = flatpickr("#date", {
            dateFormat: "d.m.Y",
        });
        const enddate = flatpickr("#enddate", {
            dateFormat: "d.m.Y",
        });
        const startdate = flatpickr("#startdate", {
            dateFormat: "d.m.Y",
        });

        const flatpickr01 = flatpickr("#flatpickr01", {
            enableTime: true,
            noCalendar: true,
        });
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
                jQuery('#userModal').modal('hide');
                this.alertService.successToastr(`SuccessFully ${this.operation} Of User.`, false);
            }, error => {
                this.hideLoader();
                jQuery('#userModal').modal('show');
                this.alertService.errorToastr(`Error in ${this.operation} User.`, false);
            });
        }
    }

    filterAttendance() {
        let pageNumber = 1;
        if (this.attendanceFilterModel.type == dateTypesEnum.custom) {

            this.attendanceService.getUserAttendance(this.selected._id, pageNumber, this.attendanceFilterModel).subscribe((attendance: any) => {
                this.userAttendance = attendance.data;
            });
        }
        else {
            this.attendanceService.getUserAttendance(this.selected._id, pageNumber, this.attendanceFilterModel).subscribe((attendance: any) => {
                this.userAttendance = attendance.data;
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
                jQuery('#deleteModal').modal('show');

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
                jQuery('#userModal').modal('show');
                this.userService.getById(Id).subscribe(res => {
                    this.model = res.data;
                });
            }
        }
        else {
            if (operation == 'delete') {

                this.showLoader();
                this.attendanceService.deleteData(Id).subscribe(res => {
                    this.hideLoader();
                    // this.userAttendance.data.splice(index,1);
                    this.alertService.successToastr("Selected Attendance Deleted Successfully.", false);

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

    searchuser(){

        
    }

    getUserAttendance(userId) {
        let pageNumber: number = 1
        this.attendanceService.getUserAttendance(userId, pageNumber, this.attendanceFilterModel).subscribe((attendance: any) => {
            console.log("attendance", attendance);
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

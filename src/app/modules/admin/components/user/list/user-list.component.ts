import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AlertService, LoaderService, UserService, AttendanceService, LeaveService } from 'src/app/core/services';
import { signUp, attendence, leave } from "src/app/models";
import { attendanceFilter, dateType } from "src/app/models/filter";
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { Constants } from 'src/shared/constants';
import { leaveType, leaveStatus } from "src/app/models/filter";
import { ConfirmationDialogueComponent } from 'src/shared/components';
import { Role } from 'src/app/models/role';
import { UtilityService } from 'src/shared/services/utility.service';

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
    modelLeave: leave;
    attendanceFilter: attendanceFilter;
    allUsers: any[];
    totalAttendanceCounts: number[];
    totalLeaveCounts: number[]
    attendancePageNumber: number = 1;
    leavePageNumber: number;
    userAttendance: any = [];
    userLeave: any = [];
    id: number;
    operation = Constants.add;
    selectedUser: any = {};
    userSearchStr: any;
    startDate: string;
    endDate: string;


    attendanceTypes: any[] = [
        { value: dateType.currentDate, name: 'Current Date' },
        { value: dateType.currentMonth, name: 'Current Month' },
        { value: dateType.lastMonth, name: 'Last Month' },
        { value: dateType.currentYear, name: 'Current Year' },
        { value: dateType.lastYear, name: 'Last Year' },
        { value: dateType.custom, name: 'Custom' }
    ];

    leaveTypes: any[] = [
        { value: leaveType.casual, name: 'Casual' },
        { value: leaveType.annual, name: 'Annual' },
    ];

    leaveStatuses: any[] = [
        { value: leaveStatus.pending, name: 'Pending' },
        { value: leaveStatus.approved, name: 'Approved' },
    ];

    firstDayofWeek = Constants.firstDayOfWeek;
    hour12Timer = true;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
        private attendanceService: AttendanceService,
        private leaveService: LeaveService,
        private loaderService: LoaderService,
        private utilityService: UtilityService,
        public dialog: MatDialog) {
        this.model = new signUp();
        this.modelAttendance = new attendence();
        this.modelLeave = new leave();
        this.attendanceFilter = new attendanceFilter();
    }

    ngOnInit() {
        this.attendanceFilter.type = dateType.currentDate;
        this.getAllUser();
        this.modelAttendance.active = false;
    }

    save(type: string) {
        if (type == Constants.attendance) {
            this.showLoader();
            this.operation = this.id ? Constants.updateData : Constants.addData;
            this.showLoader();
            this.attendanceService[this.operation](this.modelAttendance).subscribe(res => {
                this.hideLoader();
                jQuery('#attendanceNewModal').modal('hide');
                this.alertService.successToastr(`SuccessFully ${this.operation} Of Attendance.`, false);
            }, error => {
                this.hideLoader();
                this.alertService.errorToastr(`Error in ${this.operation} Attendance.`, false);
                jQuery('#attendanceNewModal').modal('hide');
            });
        }
        else if (type == Constants.user) {
            this.showLoader();
            this.operation = this.id ? Constants.updateData : Constants.addData;
            this.showLoader();
            this.userService[this.operation](this.model).subscribe(res => {
                this.hideLoader();
                jQuery('#userModal').modal('hide');
                this.getAllUser();
                this.alertService.successToastr(`SuccessFully ${this.operation} Of User.`, false);
            }, error => {
                this.hideLoader();
                jQuery('#userModal').modal('hide');
                this.alertService.errorToastr(`Error in ${this.operation} User.`, false);
            });
        }
        else {
            this.modelLeave.userId = this.selectedUser._id;
            this.showLoader();
            this.operation = this.id ? Constants.updateData : Constants.addData;
            this.showLoader();
            this.leaveService[this.operation](this.modelLeave).subscribe(res => {
                this.hideLoader();
                jQuery('#leaveNewModal').modal('hide');
                this.getAllUser();
                this.alertService.successToastr(`SuccessFully ${this.operation} Of Leave.`, false);

            }, error => {
                this.hideLoader();
                jQuery('#leaveNewModal').modal('hide');
                this.alertService.errorToastr(`Error in ${this.operation} Leave.`, false);
            });

        }
    }

    filterAttendanceAndLeave(type: string) {
        if (this.attendanceFilter.type != dateType.custom) {
            this.attendanceFilter.startDate = '';
            this.attendanceFilter.endDate = '';
            if (type == Constants.attendance) {
                this.attendanceService.getUserAttendance(this.selectedUser._id, this.attendancePageNumber, this.attendanceFilter, this.startDate, this.endDate).subscribe((attendance: any) => {
                    this.userAttendance = attendance;
                    this.calculateTotalGridPages(Constants.attendance, attendance.total);

                });
            }
            else {
                this.leaveService.getUserLeave(this.selectedUser._id, this.leavePageNumber, this.attendanceFilter, this.startDate).subscribe((leave: any) => {
                    this.userLeave = leave;
                    this.calculateTotalGridPages(Constants.leave, leave.total);
                });
            }
        }
    }

    getAllUser() {
        this.userService.getData().subscribe((users: any) => {
            let employees = users.filter(x => x.role == Role.Employee)
            this.selectedUser = employees[0];
            this.allUsers = employees;
            this.getUserAttendance(this.selectedUser._id);
            this.getUserLeave(this.selectedUser._id);

        });
    }

    customAttendanceAndLeaveFilter(type: string) {

        if (type == Constants.attendance) {
            this.startDate = this.utilityService.getCurrentDate(this.attendanceFilter.startDate);
            this.endDate = this.utilityService.getCurrentDate(this.attendanceFilter.endDate);
            this.attendanceService.getUserAttendance(this.selectedUser._id, this.attendancePageNumber, this.attendanceFilter, this.startDate, this.endDate).subscribe((attendance: any) => {
                this.userAttendance = attendance;
                this.calculateTotalGridPages(Constants.attendance, attendance.total);
            });
        }
        else {
            this.startDate = this.utilityService.getCurrentDate(this.attendanceFilter.startDate);
            this.leaveService.getUserLeave(this.selectedUser._id, this.attendancePageNumber, this.attendanceFilter, this.startDate).subscribe((leave: any) => {
                this.userLeave = leave;
                this.calculateTotalGridPages(Constants.leave, leave.total);
            });
        }
    }

    calculateTotalGridPages(type: string, total: number) {
        if (type == Constants.attendance) {
            let totalPages = Math.ceil(total / 10);
            this.totalAttendanceCounts = [];
            if (totalPages > 0) {
                for (let i = 1; i <= totalPages; i++) {
                    this.totalAttendanceCounts.push(i);
                }
            }
        }
        else {
            let totalPages = Math.ceil(total / 10);
            this.totalLeaveCounts = [];
            if (totalPages > 0) {
                for (let i = 1; i <= totalPages; i++) {
                    this.totalLeaveCounts.push(i);
                }
            }
        }

    }

    /**
         * Perform update & Delete Operation
         */
    performUpdateAndDeleteOperation(type: string, operation: string, Id: any) {
        if (type == Constants.user) {
            if (operation == Constants.delete) {
                this.openDialog(type, Id);
            }
            else if (operation == Constants.edit) {
                this.id = Id;
                jQuery('#userModal').modal('show');
                this.userService.getById(Id).subscribe(user => {
                    this.model = user;
                });
            }
        }
        else if (type == Constants.attendance) {
            if (operation == Constants.delete) {
                this.openDialog(type, Id);
            }
            else if (operation == Constants.edit) {
                this.id = Id;
                jQuery('#attendanceNewModal').modal('show');
                this.attendanceService.getById(Id).subscribe(attendance => {
                    this.modelAttendance = attendance;
                });
            }
        }
        else {
            if (operation == Constants.delete) {
                this.openDialog(type, Id);
            }
            else if (operation == Constants.edit) {
                this.id = Id;
                jQuery('#leaveNewModal').modal('show');
                this.leaveService.getById(Id).subscribe(leave => {
                    this.modelLeave = leave;
                });
            }
        }
    }

    getTablePageNumber(type: string, pageNo: number) {
        if (type == Constants.attendance) {
            this.attendancePageNumber = pageNo;
            this.filterAttendanceAndLeave(Constants.attendance);
        }
        else {
            this.leavePageNumber = pageNo;
            this.filterAttendanceAndLeave(Constants.leave);
        }
    }

    searchUser() {
        this.userService.searchUser(1, this.userSearchStr).subscribe((user: any) => {
            this.allUsers = user.data;
            this.selectedUser = user.data[0];
        });
    }

    getUserLeave(userId: any) {
        let pageNumber: number = 1
        this.leaveService.getUserLeave(userId, pageNumber, this.attendanceFilter, this.startDate).subscribe((leave: any) => {
            this.userLeave = leave;
            this.calculateTotalGridPages(Constants.leave, leave.total);
        });
    }

    getUserAttendance(userId) {
        let pageNumber: number = 1
        this.attendanceService.getUserAttendance(userId, pageNumber, this.attendanceFilter, this.startDate, this.endDate).subscribe((attendance: any) => {
            this.userAttendance = attendance;
            this.calculateTotalGridPages(Constants.attendance, attendance.total);
        }, error => {
        });
    }

    getAvailableTime(attendance) {
        var timeDiff = new Date(attendance.checkOut).getTime() - new Date(attendance.checkIn).getTime();
        if (attendance.breakStartTime && attendance.breakEndTime) {
            var breakDiff = new Date(attendance.breakEndTime).getTime() - new Date(attendance.breakStartTime).getTime();
            timeDiff = timeDiff - breakDiff;
        }
        var minutes = Math.floor((timeDiff % 60000) / 1000).toFixed(0) //in minutes
        var hours = Math.floor(timeDiff / 3600 / 1000); //in hours
        return hours + " hr " + minutes + " min ";
    }

    getUserDetails(userDetails) {
        this.selectedUser = userDetails;
        this.getUserAttendance(this.selectedUser._id);
        this.getUserLeave(this.selectedUser._id);
    }

    /**
      * Open confirmation dialogue.
      * On confirmation, deletes selected row of grid.
      * @param type is the type  is coming like user,attendance,leave
      * @Id is the Identification of the type 
      */
    openDialog(type: string, Id: any) {
        const dialogRef = this.dialog.open(ConfirmationDialogueComponent, {
            width: '400px',
            data: {
                message: 'Do you want to Delete Data?',
                type: type,
                Id: Id,
            }
        });
        if (dialogRef) {
            dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    this.performDeleteOperation(result);
                }
            });
        }
    }

    /**
            * Perform Delete Operation
            * @param result which return mesage type and id on closing dialog with choosing yes option
            */
    performDeleteOperation(result) {
        if (result.type == Constants.user) {
            this.userService.deleteData(result.Id).subscribe(res => {
                this.hideLoader();
                let currentIndex = this.allUsers.findIndex(x => x._id === result.Id);
                this.allUsers.splice(currentIndex, 1);
                this.selectedUser = this.allUsers[0];
                this.alertService.successToastr("Selected User Deleted Successfully.", false);
            }, error => {
                this.hideLoader();
                this.alertService.errorToastr("Error in Deleting Selected User.", false);
            });
        }
        else if (result.type == Constants.attendance) {

            this.showLoader();
            this.attendanceService.deleteData(result.Id).subscribe(res => {
                this.hideLoader();
                let currentIndex = this.userAttendance.data.findIndex(x => x._id == result.Id);
                this.userAttendance.data.splice(currentIndex, 1);



                this.alertService.successToastr("Selected Attendance Deleted Successfully.", false);
            }, error => {
                this.hideLoader();
                this.alertService.errorToastr("Error in Deleting Selected Attendance.", false);
            });
        }
        else {
            this.showLoader();
            this.leaveService.deleteData(result.Id).subscribe(res => {
                this.hideLoader();
                let currentIndex = this.userLeave.data.findIndex(x => x._id == result.Id);
                this.userLeave.data.splice(currentIndex, 1);
                this.alertService.successToastr("Selected Leave Deleted Successfully.", false);
            }, error => {
                this.hideLoader();
                this.alertService.errorToastr("Error in Deleting Selected Leave.", false);
            });
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

import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AlertService, LoaderService, UserService, AttendanceService, LeaveService } from 'src/app/core/services';
import { User, Attendence, Leave } from "src/app/models";
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { Constants } from 'src/shared/constants';
import { LeaveType, LeaveStatus, Filter, DurationType } from "src/app/models";
import { UserTabs } from 'src/app/models';
import { ConfirmationDialogueComponent } from 'src/shared/components';
import { Role } from 'src/app/models/role';
import { UtilityService } from 'src/shared/services/utility.service';
import * as moment from 'moment';
declare var jQuery: any;

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

    public config: PerfectScrollbarConfigInterface = { suppressScrollX: false };

    model: User;
    modelAttendance: Attendence;
    modelLeave: Leave;
    // attendanceFilter: Filter;
    allUsers: any[];
    totalAttendanceCounts: number[];
    totalLeaveCounts: number[]
    attendancePageNumber: number = 1;
    leavePageNumber: number = 1;
    userAttendance: any = [];
    userLeave: any = [];
    id: number;
    operation = Constants.add;
    selectedUser: any = {};
    userSearchStr: string = '';
    fromDate: string;
    toDate: string;
    userTabs = UserTabs;

    // 
    userAttendances: any[];
    userLeaves: Leave[];
    attendanceFilter: Filter;
    leaveFilter: Filter;
    userId: string;
    totalCounts: number[];
    pageNumber = Constants.defaultPageNumber;
    leaveSearchStr: string = '';
    attendanceSearchStr: string = '';
    leaveStatus: any = LeaveStatus;

    // 

    attendanceFilterTypes: any[] = [
        { value: DurationType.currentDate, name: 'Today' },
        { value: DurationType.yesterday, name: 'Yesterday' },
        { value: DurationType.currentMonth, name: 'This month' },
        { value: DurationType.lastMonth, name: 'Last month' },
        { value: DurationType.currentYear, name: 'This year' },
        { value: DurationType.lastYear, name: 'Last year' },
        { value: DurationType.custom, name: 'Custom' }
    ];

    leaveFilterTypes: any[] = [
        { value: DurationType.currentDate, name: 'Today' },
        { value: DurationType.yesterday, name: 'Yesterday' },
        { value: DurationType.currentMonth, name: 'This month' },
        { value: DurationType.lastMonth, name: 'Last month' },
        { value: DurationType.currentYear, name: 'This year' },
        { value: DurationType.lastYear, name: 'Last year' },
        { value: DurationType.future, name: 'Future' },
        { value: DurationType.custom, name: 'Custom' }
    ];

    leaveTypes: any[] = [
        { value: LeaveType.casual, name: 'Casual' },
        { value: LeaveType.annual, name: 'Annual' },
    ];

    leaveStatuses: any[] = [
        { value: this.leaveStatus.pending, name: 'Pending' },
        { value: this.leaveStatus.approved, name: 'Approved' },
        { value: this.leaveStatus.rejected, name: 'Rejected' }
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
        this.model = new User();
        this.modelAttendance = new Attendence();
        this.modelLeave = new Leave();
        this.attendanceFilter = new Filter();
        this.leaveFilter = new Filter();
    }

    ngOnInit() {
        this.getAllUser();
        this.modelAttendance.active = false;
        this.setDefaultFilterValues();
    }

    /**
     * Sets default values of filters
     */
    setDefaultFilterValues() {
        this.leaveFilter.searchStr = '';
        this.attendanceFilter.searchStr = '';
        this.attendanceFilter.filterType = DurationType.currentMonth;
        this.leaveFilter.filterType = DurationType.future;
    }

    /**
     * Get user attendances
     */
    getUserAttendances(pageNumber: number) {
        let fromDate = '';
        let toDate = '';
        this.userAttendances = [];

        if (this.attendanceFilter.fromDate) {
            fromDate = this.utilityService.getCurrentDate(this.attendanceFilter.fromDate);
        }

        if (this.attendanceFilter.toDate) {
            toDate = this.utilityService.getCurrentDate(this.attendanceFilter.toDate);
        }

        this.attendanceService.getUserAttendance(this.selectedUser._id, pageNumber, this.attendanceFilter.filterType, fromDate, toDate, this.attendanceFilter.searchStr).subscribe((attendance: any) => {
            if (attendance && attendance.data && attendance.total) {
                this.userAttendances = attendance.data;

                this.userAttendances.forEach(userAttendance => {
                 this.getTimeSpent(userAttendance);
                });

                // this.initPagination(attendance.total);
            }
        }, error => {
            if (error && error.error && error.error.message) {
                this.alertService.errorToastr(error.error.message);
            }
        });
    }

    /**
     * Get user leaves
     */
    getUserLeaves(pageNumber: number) {
        let fromDate = '';
        let toDate = '';
        this.userLeaves = [];

        if (this.leaveFilter.fromDate) {
            fromDate = this.utilityService.getCurrentDate(this.leaveFilter.fromDate);
        }

        if (this.leaveFilter.toDate) {
            toDate = this.utilityService.getCurrentDate(this.leaveFilter.toDate);
        }

        this.leaveService.getUserLeave(this.selectedUser._id, pageNumber, this.leaveFilter.filterType, fromDate, toDate, this.leaveFilter.searchStr).subscribe((leave: any) => {
            if (leave && leave.data && leave.total) {
                this.userLeaves = leave.data;
                // this.initPagination(leave.total);
            }
        }, error => {
            if (error && error.error && error.error.message) {
                this.alertService.errorToastr(error.error.message);
            }
        });
    }


    save(type: string) {
        this.operation = this.id ? Constants.updateData : Constants.addData;

        // Add/Update user
        if (type === Constants.user) {
            this.showLoader();
            this.userService[this.operation](this.model).subscribe(res => {
                this.hideLoader();
                jQuery('#userModal').modal('hide');

                if (this.model._id) {
                    let currentIndex = this.allUsers.findIndex(user => user._id === this.model._id);
                    this.allUsers[currentIndex] = this.model;
                    this.selectedUser = this.model;
                } else {
                    this.allUsers.push(this.model);
                }

                this.alertService.successToastr(`SuccessFully ${this.operation} Of User.`, false);
            }, error => {
                this.hideLoader();
                jQuery('#userModal').modal('hide');
                this.alertService.errorToastr(`Error in ${this.operation} User.`, false);
            });
        }
        // Add/Update user attendance
        else if (type == Constants.attendance) {
            this.modelAttendance.userId = this.selectedUser._id;

            this.showLoader();
            this.attendanceService[this.operation](this.modelAttendance).subscribe(res => {
                this.hideLoader();
                jQuery('#attendanceNewModal').modal('hide');

                if (this.modelAttendance._id) {
                    let currentIndex = this.userAttendances.findIndex(attendance => attendance._id === this.modelAttendance._id);
                    this.userAttendances[currentIndex] = this.modelAttendance;
                } else {
                    this.userAttendances.push(this.modelAttendance);
                }

                this.alertService.successToastr(`SuccessFully ${this.operation} Of Attendance.`, false);
            }, error => {
                this.hideLoader();
                this.alertService.errorToastr(`Error in ${this.operation} Attendance.`, false);
                jQuery('#attendanceNewModal').modal('hide');
            });
        }
        else { // Add/Update user Leave
            this.modelLeave.userId = this.selectedUser._id;
            this.showLoader();
            this.leaveService[this.operation](this.modelLeave).subscribe(res => {
                this.hideLoader();
                jQuery('#leaveNewModal').modal('hide');

                if (this.modelLeave._id) {
                    let currentIndex = this.userLeaves.findIndex(leave => leave._id === this.modelLeave._id);
                    this.userLeaves[currentIndex] = this.modelLeave;
                } else {
                    this.userLeaves.push(this.modelLeave);
                }

                this.alertService.successToastr(`SuccessFully ${this.operation} Of Leave.`, false);
            }, error => {
                this.hideLoader();
                jQuery('#leaveNewModal').modal('hide');
                this.alertService.errorToastr(`Error in ${this.operation} Leave.`, false);
            });
        }
    }

    // filterAttendanceAndLeave(type: string) {
    //     if (this.attendanceFilter.filterType != DurationType.custom) {
    //         this.attendanceFilter.fromDate = '';
    //         this.attendanceFilter.toDate = '';

    //         if (type == Constants.attendance) {
    //             this.attendanceService.getUserAttendance(this.selectedUser._id, this.attendancePageNumber, this.attendanceFilter.filterType, this.fromDate, this.toDate).subscribe((attendance: any) => {
    //                 this.userAttendance = attendance;
    //                 this.calculateTotalGridPages(Constants.attendance, attendance.total);

    //             });
    //         } else {
    //             this.leaveService.getUserLeave(this.selectedUser._id, this.leavePageNumber, this.attendanceFilter.filterType, this.fromDate).subscribe((leave: any) => {
    //                 this.userLeave = leave;
    //                 this.calculateTotalGridPages(Constants.leave, leave.total);
    //             });
    //         }
    //     }
    // }

    getAllUser() {
        this.allUsers = [];
        this.userService.getData().subscribe((employees: any) => {
            this.allUsers = employees;

            if (employees.length) {
                this.selectedUser = employees[0];
                this.getUserAttendances(1);
                this.getUserLeaves(1);
            }
        });
    }

    customAttendanceAndLeaveFilter(type: string) {

        if (type == Constants.attendance) {
            this.fromDate = '';
            this.toDate = '';

            if (this.attendanceFilter.fromDate) {
                this.fromDate = this.utilityService.getCurrentDate(this.attendanceFilter.fromDate);
            }

            if (this.attendanceFilter.toDate) {
                this.toDate = this.utilityService.getCurrentDate(this.attendanceFilter.toDate);
            }

            this.attendanceService.getUserAttendance(this.selectedUser._id, this.attendancePageNumber, this.attendanceFilter.filterType, this.fromDate, this.toDate).subscribe((attendance: any) => {
                this.userAttendance = attendance;
                this.calculateTotalGridPages(Constants.attendance, attendance.total);
            });
        }
        else {
            this.fromDate = this.utilityService.getCurrentDate(this.attendanceFilter.fromDate);
            this.leaveService.getUserLeave(this.selectedUser._id, this.attendancePageNumber, this.attendanceFilter.filterType, this.fromDate).subscribe((leave: any) => {
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

    /**
     * Get paged users and select user on top.
     */
    getPagedUsers() {
        this.allUsers = [];
        this.userService.getPagedUsers(1, this.userSearchStr).subscribe((user: any) => {
            this.allUsers = user.data;
            this.selectedUser = this.allUsers[0];
        });
    }

    /**
     * Get time spent in office.
     * @param attendance User attendance
     */
    getTimeSpent(attendance: any) {
        if(attendance.active){
        const today = new Date();
        let breakDiff = 0;
        let timeDiff = new Date(attendance.checkOut).getTime() - new Date(attendance.checkIn).getTime();

        // Today attendance scenario, if not checkout yet then use current time as second-date/checked-out date
        if (this.getDaysDifference(today, attendance.date) <= 2 && !attendance.checkOut) {
            timeDiff = today.getTime() - new Date(attendance.checkIn).getTime();

            if (attendance.breakStartTime && !attendance.breakEndTime) {
                breakDiff = today.getTime() - new Date(attendance.breakStartTime).getTime();
            }
        }

        if (attendance.breakStartTime && attendance.breakEndTime) {
            breakDiff = new Date(attendance.breakEndTime).getTime() - new Date(attendance.breakStartTime).getTime();
        }

        if (timeDiff < 0) timeDiff = timeDiff * -1;
        timeDiff = timeDiff - breakDiff;
        attendance.timeSpent = moment(attendance.date).add(moment.duration(timeDiff)).format('HH:mm');

          // Time spent in office must be greater than 8 hours (28800000 ms);
          if((timeDiff >= 28800000)) {
            // 32400000 ms = 9 hours
            attendance.timeCompleted = true
        }
    }
    }

    /**
     * Get days difference from two dates.
     * @param fromDate First date
     * @param toDate Second date
     */
    getDaysDifference(fromDate: string | Date, toDate: string | Date) {
        let startDate = moment(fromDate);
        let endDate = moment(toDate);
        return endDate.diff(startDate, 'days') + 1;
    }

    /**
     * Get user details for selected user.
     * @param userDetails Selected user
     */
    getUserDetail(userDetails: User) {
        console.log("this.selectedUser:", userDetails);
        this.selectedUser = userDetails;
        this.getUserAttendances(1);
        this.getUserLeaves(1);
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
                let currentIndex = this.userAttendances.findIndex(x => x._id == result.Id);
                this.userAttendances.splice(currentIndex, 1);



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
                let currentIndex = this.userLeaves.findIndex(x => x._id == result.Id);
                this.userLeaves.splice(currentIndex, 1);
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

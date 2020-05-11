import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AlertService, LoaderService, UserService, AttendanceService, LeaveService } from 'src/app/core/services';
import { User, Attendence, Leave } from "src/app/models";
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { Constants } from 'src/app/shared/constants';
import { LeaveType, LeaveStatus, Filter, DurationType } from "src/app/models";
import { UserTabs } from 'src/app/models';
import { ConfirmationDialogueComponent } from 'src/app/shared/components';
import { Role } from 'src/app/models/role';
import { UtilityService } from 'src/app/shared/services';
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
    userDetailFilter: Filter;
    userId: string;
    totalCounts: number[];
    pageNumber = Constants.defaultPageNumber;
    leaveSearchStr: string = '';
    attendanceSearchStr: string = '';
    leaveStatus: any = LeaveStatus;
    userCount: any = { totalAbsent: 0, approved: 0, pending: 0, casual: 0, annual: 0 };
    totalAttendances:number;
    totalLeaves:number;

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
        this.userDetailFilter = new Filter();
    }

    ngOnInit() {
        this.getAllUser();
        this.modelAttendance.active = false;
        this.setDefaultFilterValues();
        this.model.photo = 'assets/images/avatars/unknown-profile.jpg';
    }

    /**
     * Sets default values of filters
     */
    setDefaultFilterValues() {
        this.leaveFilter.searchStr = '';
        this.attendanceFilter.searchStr = '';
        this.attendanceFilter.filterType = DurationType.currentMonth;
        this.leaveFilter.filterType = DurationType.future;
        this.userDetailFilter.filterType = DurationType.currentMonth;
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
            if (attendance) {
                this.userAttendances = attendance.data;
                this.totalAttendances = attendance.total;

                this.userAttendances.forEach(userAttendance => {
                    this.getTimeSpent(userAttendance);
                });
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
            if (leave) {
                this.userLeaves = leave.data;
                this.totalLeaves = leave.total;
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
                    this.model._id = res._id
                    this.allUsers.push(this.model);
                }

                this.alertService.successToastr(`SuccessFully ${this.operation} Of User.`, false);
                this.clearModalData();
            }, error => {
                this.hideLoader();
                jQuery('#userModal').modal('hide');
                this.alertService.errorToastr(`Error in ${this.operation} User.`, false);
                this.clearModalData();
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
                    this.getTimeSpent(this.modelAttendance);
                    this.userAttendances[currentIndex] = this.modelAttendance;
                } else {
                    this.getTimeSpent(this.modelAttendance);
                    this.userAttendances.push(this.modelAttendance);
                }

                this.alertService.successToastr(`SuccessFully ${this.operation} Of Attendance.`, false);
                this.clearModalData();
            }, error => {
                this.hideLoader();
                this.alertService.errorToastr(`Error in ${this.operation} Attendance.`, false);
                jQuery('#attendanceNewModal').modal('hide');
                this.clearModalData();
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
                this.clearModalData();
            }, error => {
                this.hideLoader();
                jQuery('#leaveNewModal').modal('hide');
                this.alertService.errorToastr(`Error in ${this.operation} Leave.`, false);
                this.clearModalData();
            });
        }
    }

        /**
     * Upload photo in base64 format
     * @param event
     * @see http://bachors.com/code/convert-image-to-base64-blob-binary-using-javascript
     * @see https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
     */
    uploadPhoto(event: any) {
        // const file = event.target.files[0];

        // if (file) {
        //     if (/(jpe?g|png)$/i.test(file.type)) {
        //         const fileReader = new FileReader();
        //         const _this = this;

        //         fileReader.onload = function (evt) {
        //             const base64Img = evt.target.result;
        //             _this.model.photo = base64Img;
        //             _this.userService.uploadPhoto(_this.selectedUser._id, { photo: 'base64Img' }).subscribe(res => {
        //                 _this.selectedUser.photo = base64Img;
        //                 _this.alertService.successToastr(res.message);
        //             }, error => {
        //                 if (error && error.error && error.error.message) {
        //                     _this.alertService.errorToastr(error.error.message);
        //                 }
        //             });
        //         }

        //         fileReader.readAsDataURL(file);
        //     } else {
        //         this.alertService.errorToastr("Invalid photo type! Photo type must PNG or JPEG");
        //     }
        // } else {
        //     this.alertService.errorToastr("Failed to load photo, please try again");
        // }
    }

    /**
     * Clear modal data.
     */
    clearModalData() {
        this.model = new User();
        this.modelAttendance = new Attendence();
        this.modelLeave = new Leave();
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
                // this.calculateTotalGridPages(Constants.attendance, attendance.total);
                
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
     * 
     * @param totalRecord Total number of records
     */
    initPagination(totalRecord:number) {
    const totalPages = Math.ceil(totalRecord / 10);
    let pagination = [];

    for (let i = 1; i <= totalPages; i++) {
        pagination.push(i);
    }

    return {totalPages: totalPages, paginationArr: pagination};
}

/**
 * Fired on pagination change.
 * @param {any} data data emitted on page changed. 
 */
pageChanged(data:any) {
    switch (data.paginationId) {
        case 'attendance':
            this.getUserAttendances(data.currentPage);
            break;
        
        case 'leave':
            this.getUserLeaves(data.currentPage);
            break;
    
        default:
            break;
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
                    console.log("*user:",user);
                });
            } else if (operation === 'change_password') {
                this.id = Id;
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
        if (attendance.active) {
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
            if ((timeDiff >= 28800000)) {
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
        if(!this.model.photo) {
            this.model.photo = 'assets/images/avatars/unknown-profile.jpg';
        }

        this.getUserAttendances(1);
        this.getUserLeaves(1);
        this.getCounts();
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
     * Get attendance, leave and absent counts for a specific user.
     */
    getCounts() {
        this.userCount = { approved: 0, pending: 0, casual: 0, annual: 0, totalAbsent: 0 };
        this.getAbsentCount();
        this.getLeaveCount();
    }

    /**
     * Get user absent count
     */
    getAbsentCount() {
        this.showLoader();
        this.attendanceService.getUserAttendanceCount(this.selectedUser._id, this.userDetailFilter.filterType, this.fromDate, this.toDate, false).subscribe((attendance: any) => {
            this.hideLoader();
            this.userCount.totalAbsent = attendance.total;
        });
    }

    /**
    * Get user leave details (i.e. approved,pending,casual, annual leave counts)
    */
    getLeaveCount() {
        this.showLoader();
        this.leaveService.getUserLeave(this.selectedUser._id, 1, this.userDetailFilter.filterType, this.fromDate, this.toDate, '', 0).subscribe((leaves: any) => {
            this.hideLoader();
            if (leaves && leaves.data) {
                leaves.data.forEach(userLeave => {
                    if (userLeave.status === 'pending') {
                        this.userCount.pending += 1;
                    } else if (userLeave.status === 'approved') {
                        this.userCount.approved += 1;

                        if (userLeave.type === 'casual') {
                            this.userCount.casual += 1;
                        } else {
                            this.userCount.annual += 1;
                        }
                    }
                });
            }
        });
    }

    /**
     * Get image
     * @param photo 
     */
    getImage(photo:any){
        return photo? photo: 'assets/images/avatars/unknown-profile.jpg';
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

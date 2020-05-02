import { Component, OnInit } from '@angular/core';
import { AlertService, LoaderService, AttendanceService, LeaveService } from 'src/app/core/services/index';
import { Constants } from 'src/app/shared/constants';
import { Filter, DurationType, LeaveStatus, LeaveType } from "src/app/models";
import { UtilityService } from 'src/app/shared/services/utility.service';

@Component({
  selector: 'app-dashboard-form',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  fullname: string;
  userId: string;
  totalAttendance: number;
  totalLeaveStatus: number;
  totalLeaveType: number;
  totalAbsent: number;
  firstDayofWeek = Constants.firstDayOfWeek;
  fromDate: string;
  toDate: string;
  filter: Filter;

  leaveDetail: any = { approved: 0, pending: 0, casual: 0, annual: 0, totalAttendance: 0, totalAbsent: 0 };

  filterTypes: any[] = [
    { value: DurationType.currentDate, name: 'Today' },
    { value: DurationType.currentMonth, name: 'This month' },
    { value: DurationType.lastMonth, name: 'Last month' },
    { value: DurationType.currentYear, name: 'This year' },
    { value: DurationType.lastYear, name: 'Last year' },
    { value: DurationType.lastYear, name: 'Future' },
    // { value: DurationType.custom, name: 'Custom' }
  ];

  constructor(
    private alertService: AlertService,
    private loaderService: LoaderService,
    private attendanceService: AttendanceService,
    private leaveService: LeaveService,
    private utilityService: UtilityService

  ) {
    this.filter = new Filter();
  }

  ngOnInit() {
    let currentUser = JSON.parse(localStorage.getItem(Constants.currentUser));
    this.fullname = `${currentUser.firstname} ${currentUser.lastname}`;
    this.userId = currentUser.userId;

    this.setDefaultFilterValues();
    this.getCounts();
  }

  /**
   * Set default values of filters.
   */
  setDefaultFilterValues() {
    this.filter.filterType = DurationType.currentMonth;
    this.filter.filterType = DurationType.currentMonth;
  }

  filterResult() {
    this.fromDate = this.utilityService.getCurrentDate(this.filter.fromDate);
    this.toDate = this.utilityService.getCurrentDate(this.filter.toDate);
    this.getCounts();
  }

  /**
   * Get user leave details (i.e. approved,pending,casual, annual leave counts)
   */
  getLeaveCount() {
    this.showLoader();
    this.leaveService.getUserLeave(this.userId, 1, this.filter.filterType, this.fromDate, this.toDate, '', 0).subscribe((leaves: any) => {
      this.hideLoader();
      if (leaves && leaves.data) {
        leaves.data.forEach(userLeave => {
          if (userLeave.status === 'pending') {
            this.leaveDetail.pending += 1;
          } else if (userLeave.status === 'approved') {
            this.leaveDetail.approved += 1;

            if (userLeave.type === 'casual') {
              this.leaveDetail.casual += 1;
            } else {
              this.leaveDetail.annual += 1;
            }
          }
        });
      }
    });
  }

  /**
   * Get attendance, leave and absent counts for a specific user.
   */
  getCounts() {
    this.leaveDetail = { approved: 0, pending: 0, casual: 0, annual: 0, totalAttendance: 0, totalAbsent: 0 };
    this.getAttendanceCount();
    this.getAbsentCount();
    this.getLeaveCount();
  }

  /**
   * Get user present count
   */
  getAttendanceCount() {
    this.showLoader();
    this.attendanceService.getUserAttendanceCount(this.userId, this.filter.filterType, this.fromDate, this.toDate, true).subscribe((attendance: any) => {
      this.hideLoader();
      this.leaveDetail.totalAttendance = attendance.total;
    });
  }

  /**
   * Get user absent count
   */
  getAbsentCount() {
    this.showLoader();
    this.attendanceService.getUserAttendanceCount(this.userId, this.filter.filterType, this.fromDate, this.toDate, false).subscribe((attendance: any) => {
      this.hideLoader();
      this.leaveDetail.totalAbsent = attendance.total;
    });
  }

  /**
   * Get counts based on filters.
   */
  filterAttendance() {
    if (this.filter.filterType === DurationType.custom) {
      this.fromDate = this.utilityService.getCurrentDate(this.filter.fromDate);
      this.toDate = this.utilityService.getCurrentDate(this.filter.toDate);
    } else {
      this.filter.toDate = '';
      this.filter.fromDate = '';
      this.fromDate = '';
      this.toDate = '';
    }

    this.getCounts();
  }

  /**
   * Checkin current user
   */
  checkIn() {
    this.showLoader();
    this.attendanceService.checkIn().subscribe((result: any) => {
      this.hideLoader();
      this.alertService.successToastr(`Good Morning ${this.fullname}!`, false);
    }, error => {
      this.hideLoader();
      this.alertService.warningToastr(`${error.error.message}`, false);
    });
  }

  /**
   * Checkout current user
   */
  checkOut() {
    this.showLoader();
    this.attendanceService.checkOut().subscribe((result: any) => {
      this.hideLoader();
      this.alertService.successToastr(`Good Night ${this.fullname}!`, false);
    }, error => {
      this.hideLoader();
      this.alertService.warningToastr(`${error.error.message}`, false);
    });
  }

  /**
   * Start break time for current user.
   */
  breakStart() {
    this.showLoader();
    this.attendanceService.startBreak().subscribe((result: any) => {
      this.hideLoader();
      this.alertService.successToastr(`See you soon ${this.fullname}!`, false);
    }, error => {
      this.hideLoader();
      this.alertService.warningToastr(`${error.error.message}`, false);
    });
  }

  /**
   * End break time for current user.
   */
  breakEnd() {
    this.showLoader();
    this.attendanceService.endBreak().subscribe((result: any) => {
      this.hideLoader();
      this.alertService.successToastr(`Welcome back ${this.fullname}!`, false);
    }, error => {
      this.hideLoader();
      this.alertService.warningToastr(`${error.error.message}`, false);
    });
  }

  /**
   * Show loader
   */
  showLoader() {
    this.loaderService.show();
  }

  /**
   * Hide loader
   */
  hideLoader() {
    this.loaderService.hide();
  }
}

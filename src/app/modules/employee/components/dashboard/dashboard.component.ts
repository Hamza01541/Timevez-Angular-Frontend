import { Component, OnInit } from '@angular/core';
import { AlertService, LoaderService, AttendanceService, LeaveService } from 'src/app/core/services/index';
import { Constants } from 'src/shared/constants';
import { attendanceFilter, dateType, leaveStatus, leaveFilter, leaveType } from "src/app/models/filter";
import { UtilityService } from 'src/shared/services/utility.service';

@Component({
  selector: 'app-dashboard-form',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  fullName: string;
  userId: string;
  totalAttendance: number;
  totalLeaveStatus: number;
  totalLeaveType: number;
  totalAbsent: number;
  firstDayofWeek = Constants.firstDayOfWeek;
  startDate: string;
  endDate: string;
  attendanceFilter: attendanceFilter;
  leaveFilter: leaveFilter;

  leaveDetail: any = { approved: 0, pending: 0, casual: 0, annual: 0 };

  attendanceTypes: any[] = [
    { value: dateType.currentDate, name: 'Current Date' },
    { value: dateType.currentMonth, name: 'Current Month' },
    { value: dateType.lastMonth, name: 'Last Month' },
    { value: dateType.currentYear, name: 'Current Year' },
    { value: dateType.lastYear, name: 'Last Year' },
    { value: dateType.custom, name: 'Custom' }
  ];

  leaveStatuses: any[] = [
    { value: leaveStatus.approved, name: 'Approved' },
    { value: leaveStatus.pending, name: 'Pending' },
  ];

  leaveType: any[] = [
    { value: leaveType.casual, name: 'Casual' },
    { value: leaveType.annual, name: 'Annual' },
  ];

  constructor(
    private alertService: AlertService,
    private loaderService: LoaderService,
    private attendanceService: AttendanceService,
    private leaveService: LeaveService,
    private utilityService: UtilityService

  ) {
    this.attendanceFilter = new attendanceFilter();
    this.leaveFilter = new leaveFilter();
  }

  ngOnInit() {
    let currentUser = JSON.parse(localStorage.getItem(Constants.currentUser));
    this.fullName = `${currentUser.firstname} ${currentUser.lastname}`;
    this.userId = currentUser.userId;
    this.getCounts();
    this.setDefaultDropDownValue();
  }

  setDefaultDropDownValue() {
    this.attendanceFilter.type = dateType.currentDate;
    this.leaveFilter.status = leaveStatus.pending;
    this.leaveFilter.type = leaveType.casual;
  }

  filterResult() {
    this.startDate = this.utilityService.getCurrentDate(this.attendanceFilter.startDate);
    this.endDate = this.utilityService.getCurrentDate(this.attendanceFilter.endDate);
    this.getCounts();
  }

  getLeaveDetail() {
    this.leaveService.getUserLeave(this.userId, 1, this.leaveFilter.status, this.startDate, this.endDate, 0).subscribe((leaves: any) => {
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

getCounts() {
  this.getTotalAttendance();
  this.getTotalAbsent();
  this.getLeaveDetail();
}

getTotalAttendance() {
  this.attendanceService.getUserAttendanceCount(this.userId, true, this.attendanceFilter, this.startDate, this.endDate).subscribe((attendance: any) => {
    this.totalAttendance = attendance.total;
  });
}

getTotalAbsent() {
  this.attendanceService.getUserAttendanceCount(this.userId, false, this.attendanceFilter, this.startDate, this.endDate).subscribe((attendance: any) => {
    this.totalAbsent = attendance.total;
  });
}

filterAttendance() {
  if (this.attendanceFilter.type != dateType.custom) {
    this.attendanceFilter.endDate = '';
    this.attendanceFilter.startDate = '';
    this.startDate = '';
    this.endDate = '';
    this.getCounts();
  }
}

/**
 * Checkin user
 */
checkIn() {
  this.showLoader();
  this.attendanceService.checkIn().subscribe((result: any) => {
    this.hideLoader();
    this.alertService.successToastr(`Good Morning ${this.fullName}!`, false);
  }, error => {
    this.hideLoader();
    this.alertService.warningToastr("Already Clocked In", false);
  });
}

/**
 * Checkout user
 */
checkOut() {
  this.showLoader();
  this.attendanceService.checkOut().subscribe((result: any) => {
    this.hideLoader();
    this.alertService.successToastr(`Good Night ${this.fullName}!`, false);
  }, error => {
    this.hideLoader();
    this.alertService.warningToastr("Already Checekd Out", false);
  });
}

/**
 * Start break time
 */
breakStart() {
  this.showLoader();
  this.attendanceService.startBreak().subscribe((result: any) => {
    this.hideLoader();
    this.alertService.successToastr(`See you soon ${this.fullName}!`, false);
  }, error => {
    this.hideLoader();
    this.alertService.warningToastr("Break Started already", false);
  });
}

/**
 * End break time
 */
breakEnd() {
  this.showLoader();
  this.attendanceService.endBreak().subscribe((result: any) => {
    this.hideLoader();
    this.alertService.successToastr(`Welcome back ${this.fullName}!`, false);
  }, error => {
    this.hideLoader();
    this.alertService.warningToastr("Break Ended already", false);
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

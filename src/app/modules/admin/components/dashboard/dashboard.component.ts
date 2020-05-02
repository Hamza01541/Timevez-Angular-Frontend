import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService, AlertService, LoaderService, AttendanceService, LeaveService } from 'src/app/core/services/index';
import { Filter, DurationType } from "src/app/models";
import { Constants } from 'src/app/shared/constants';
import { UtilityService } from 'src/app/shared/services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  totalUsers: number;
  totalPresent: number;
  totalAbsent: number;
  totalLeave: number;
  fullName: string;
  fromDate: string;
  toDate: string;
  attendanceFilter: Filter;
  firstDayofWeek = Constants.firstDayOfWeek;

  filterTypes: any[] = [
    { value: DurationType.currentDate, name: 'Today' },
    { value: DurationType.currentMonth, name: 'This month' },
    { value: DurationType.lastMonth, name: 'Last month' },
    { value: DurationType.currentYear, name: 'This year' },
    { value: DurationType.lastYear, name: 'Last year' },
    { value: DurationType.custom, name: 'Custom' }
  ];

  constructor(
    private userService: UserService,
    private attendanceService: AttendanceService,
    private leaveService: LeaveService,
    private alertService: AlertService,
    private loaderService: LoaderService,
    private utilityService: UtilityService

  ) {
    this.attendanceFilter = new Filter();
  }

  ngOnInit() {
    this.attendanceFilter.filterType = DurationType.currentDate;
    let currentUser = JSON.parse(localStorage.getItem(Constants.currentUser));
    this.fullName = `${currentUser.firstname} ${currentUser.lastname}`;
    this.getCounts();
  }

  getCounts() {
    this.getTotalUsers();
    this.getTotalLeave();
  }

  getTotalUsers() {
    this.userService.getTotalUsers(this.attendanceFilter.filterType, this.toDate).subscribe((users: any) => {
      this.totalUsers = users.total;
      this.getTotalPresent();
    });
  }

  getTotalPresent() {
    this.attendanceService.getTotalAttendance(this.attendanceFilter.filterType,  this.fromDate, this.toDate).subscribe((present: any) => {
      this.totalPresent = present.total;
      this.getTotalAbsent();
    });
  }

  /**
   * Get total absent users for current date.
   */
  getTotalAbsent() {
//     let DayDifference = Math.abs((new Date (this.fromDate).valueOf() - new Date (this.toDate).valueOf())/(24*60*60*1000));

// if(!DayDifference){
//   DayDifference = 1;
// }

  this.totalAbsent = this.totalUsers - this.totalPresent * 1;

  if(this.totalAbsent < 1){
    this.totalAbsent = 0;
  }
  }

  getTotalLeave() {
    this.leaveService.getTotalLeave(this.attendanceFilter.filterType, status, this.fromDate, this.toDate).subscribe((leave: any) => {
      this.totalLeave = leave.total;
    });
  }

  filterAttendance() {

    if (this.attendanceFilter.filterType != DurationType.custom) {
      this.attendanceFilter.toDate = '';
      this.attendanceFilter.fromDate = '';
      this.fromDate = '';
      this.toDate = '';
      this.getCounts();
    }
  }

  filterResult() {
    this.fromDate = this.utilityService.getCurrentDate(this.attendanceFilter.fromDate)
    this.toDate = this.utilityService.getCurrentDate(this.attendanceFilter.toDate)
    this.getCounts();
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

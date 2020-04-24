import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService, AlertService, LoaderService, AttendanceService, LeaveService } from 'src/app/core/services/index';
import { attendanceFilter, dateType } from "src/app/models/filter";
import { Constants } from 'src/shared/constants';
import { UtilityService } from 'src/shared/services/utility.service';

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
  startDate: string;
  endDate: string;
  attendanceFilter: attendanceFilter;
  firstDayofWeek = Constants.firstDayOfWeek;

  attendanceTypes: any[] = [
    { value: dateType.currentDate, name: 'Current Date' },
    { value: dateType.currentMonth, name: 'Current Month' },
    { value: dateType.lastMonth, name: 'Last Month' },
    { value: dateType.currentYear, name: 'Current Year' },
    { value: dateType.lastYear, name: 'Last Year' },
    { value: dateType.custom, name: 'Custom' }
  ];

  constructor(
    private userService: UserService,
    private attendanceService: AttendanceService,
    private leaveService: LeaveService,
    private alertService: AlertService,
    private loaderService: LoaderService,
    private utilityService: UtilityService

  ) {
    this.attendanceFilter = new attendanceFilter();
  }

  ngOnInit() {
    this.attendanceFilter.type = dateType.currentDate;
    let currentUser = JSON.parse(localStorage.getItem(Constants.currentUser));
    this.fullName = `${currentUser.firstname} ${currentUser.lastname}`;
    this.getCounts();
  }

  getCounts() {
    this.getTotalUsers();
    this.getTotalLeave();
  }

  getTotalUsers() {
    this.userService.getTotalUsers(this.attendanceFilter.type, this.endDate).subscribe((users: any) => {
      this.totalUsers = users.total;
      this.getTotalPresent();
    });
  }

  getTotalPresent() {
    this.attendanceService.getTotalAttendance(this.attendanceFilter, true, this.startDate, this.endDate).subscribe((present: any) => {
      this.totalPresent = present.total;
      this.getTotalAbsent();
    });
  }

  /**
   * Get total absent users for current date.
   */
  getTotalAbsent() {
//     let DayDifference = Math.abs((new Date (this.startDate).valueOf() - new Date (this.endDate).valueOf())/(24*60*60*1000));

// if(!DayDifference){
//   DayDifference = 1;
// }

  this.totalAbsent = this.totalUsers - this.totalPresent * 1;

  if(this.totalAbsent < 1){
    this.totalAbsent = 0;
  }
  }

  getTotalLeave() {
    this.leaveService.getTotalLeave(this.attendanceFilter, status, this.startDate, this.endDate).subscribe((leave: any) => {
      this.totalLeave = leave.total;
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

  filterResult() {
    this.startDate = this.utilityService.getCurrentDate(this.attendanceFilter.startDate)
    this.endDate = this.utilityService.getCurrentDate(this.attendanceFilter.endDate)
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

import { Component, OnInit } from '@angular/core';
import { AlertService, LoaderService, AttendanceService, LeaveService } from 'src/app/core/services';
import { Constants } from 'src/shared/constants';
import { UtilityService } from 'src/shared/services/utility.service';
import * as moment from 'moment';
import { Attendence, Leave, DurationType, Filter, LeaveStatus } from 'src/app/models';

@Component({
  selector: 'history-component',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})

export class HistoryComponent implements OnInit {
  userAttendances: Attendence[];
  userLeaves: Leave[];
  attendanceFilter: Filter;
  leaveFilter: Filter;
  userId: string;
  totalCounts: number[];
  pageNumber = Constants.defaultPageNumber;
  leaveStatus: any = LeaveStatus;

  attendanceFilterTypes: any[] = [
    { value: DurationType.currentDate, name: 'Today' },
    { value: DurationType.yesterday, name: 'Yesterday' },
    { value: DurationType.currentMonth, name: 'This month' },
    { value: DurationType.lastMonth, name: 'Last month' },
    { value: DurationType.currentYear, name: 'This year' },
    { value: DurationType.lastYear, name: 'Last year' },
    // { value: DurationType.custom, name: 'Custom' }
  ];
 
  leaveFilterTypes: any[] = [
    { value: DurationType.currentDate, name: 'Today' },
    { value: DurationType.yesterday, name: 'Yesterday' },
    { value: DurationType.currentMonth, name: 'This month' },
    { value: DurationType.lastMonth, name: 'Last month' },
    { value: DurationType.currentYear, name: 'This year' },
    { value: DurationType.lastYear, name: 'Last year' },
    { value: DurationType.future, name: 'Future'},
    // { value: DurationType.custom, name: 'Custom' }
  ];

  constructor(
    private alertService: AlertService,
    private loaderService: LoaderService,
    private attendanceService: AttendanceService,
    private leaveService: LeaveService,
    private utilityService: UtilityService
  ) {
    this.attendanceFilter = new Filter();
    this.leaveFilter = new Filter();
  }

  ngOnInit() {
    this.attendanceFilter.filterType = DurationType.currentMonth;
    this.leaveFilter.filterType = DurationType.currentMonth;
    let currentUser = JSON.parse(localStorage.getItem(Constants.currentUser));
    this.userId = currentUser.userId;

    this.getUserAttendances(this.pageNumber);
    this.getUserLeaves(this.pageNumber);
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

    this.attendanceService.getUserAttendance(this.userId, pageNumber, this.attendanceFilter.filterType, fromDate, toDate).subscribe((attendance: any) => {
      if (attendance && attendance.data && attendance.total) {
        this.userAttendances = attendance.data;

        this.userAttendances.forEach(userAttendance => {
          this.getTimeSpent(userAttendance);
         });

        this.initPagination(attendance.total);
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

    this.leaveService.getUserLeave(this.userId, pageNumber, this.leaveFilter.filterType, fromDate, toDate).subscribe((leave: any) => {
      if (leave && leave.data && leave.total) {
        this.userLeaves = leave.data;

        this.initPagination(leave.total);
      }
    }, error => {
      if (error && error.error && error.error.message) {
        this.alertService.errorToastr(error.error.message);
      }
    });
  }

  /**
   * Initialize pagination.
   * @param total Total number of records.
   */
  initPagination(total: number) {
    let totalPages = Math.ceil(total / 10);

    this.totalCounts = [];
    if (totalPages > 0) {
      for (let i = 1; i <= totalPages; i++) {
        this.totalCounts.push(i);
      }
    }
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

  tabChanged() {

  }
}


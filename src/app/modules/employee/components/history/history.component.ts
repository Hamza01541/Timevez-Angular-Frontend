import { Component, OnInit } from '@angular/core';
import { AlertService, LoaderService, AttendanceService } from 'src/app/core/services';
import { attendanceFilter, dateType } from "src/app/models/filter";
import { Constants } from 'src/shared/constants';
import { UtilityService } from 'src/shared/services/utility.service';
import * as moment from 'moment';
import {Attendence, Leave} from 'src/app/models';

@Component({
  selector: 'history-component',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})

export class HistoryComponent implements OnInit {

  fullName: string;
  userAttendance: any = [];
  userId: string;
  attendanceFilter: attendanceFilter;
  totalCounts: number[];
  pageNumber = Constants.defaultPageNumber
  firstDayofWeek = Constants.firstDayOfWeek;
  startDate: string;
  endDate: string;

  attendanceTypes: any[] = [
    { value: dateType.currentDate, name: 'Today' },
    { value: dateType.currentMonth, name: 'This month' },
    { value: dateType.lastMonth, name: 'Last month' },
    { value: dateType.currentYear, name: 'This year' },
    { value: dateType.lastYear, name: 'Last year' },
    // { value: dateType.custom, name: 'Custom' }
  ];

  constructor(
    private alertService: AlertService,
    private loaderService: LoaderService,
    private attendanceService: AttendanceService,
    private utilityService: UtilityService
  ) {
    this.attendanceFilter = new attendanceFilter();
  }

  ngOnInit() {
    this.attendanceFilter.type = dateType.currentDate;
    let currentUser = JSON.parse(localStorage.getItem(Constants.currentUser));
    this.fullName = `${currentUser.firstname} ${currentUser.lastname}`;
    this.getUserAttendance(currentUser.userId);

  }

  getUserAttendance(id) {
    this.userId = id;
    this.attendanceService.getUserAttendance(id, this.pageNumber, this.attendanceFilter.type, this.startDate, this.endDate).subscribe((attendance: any) => {
      this.userAttendance = attendance.data;
      let totalPages = Math.ceil(attendance.total / 10);

      this.totalCounts = [];
      if (totalPages > 0) {
        for (let i = 1; i <= totalPages; i++) {
          this.totalCounts.push(i);
        }
      }
    });
  }

  getPageNumber(pageNo: number) {
    this.pageNumber = pageNo;
    this.filterAttendance();
  }

  filterResult() {
    this.startDate = this.utilityService.getCurrentDate(this.attendanceFilter.startDate);
    this.endDate = this.utilityService.getCurrentDate(this.attendanceFilter.endDate);
    this.attendanceService.getUserAttendance(this.userId, this.pageNumber, this.attendanceFilter.type, this.startDate, this.endDate).subscribe((attendance: any) => {
      this.userAttendance = attendance.data;
    });
  }

  filterAttendance() {
    if (this.attendanceFilter.type != dateType.custom) {
      this.attendanceService.getUserAttendance(this.userId, this.pageNumber, this.attendanceFilter.type, this.startDate, this.endDate).subscribe((attendance: any) => {
        this.userAttendance = attendance.data;
      });
    }
  }

  /**
   * Get time diffence from checkin, checkout, break start time and break end time to calculate time spent in office.
   * @param {Attendence} attendance
   */
  getAvailableTime(attendance: Attendence) {
    var timeDiff = new Date(attendance.checkOut).getTime() - new Date(attendance.checkIn).getTime();

    if (attendance.breakStartTime && attendance.breakEndTime) {
      var breakDiff = new Date(attendance.breakEndTime).getTime() - new Date(attendance.breakStartTime).getTime();
      timeDiff = timeDiff - breakDiff;
    }

    return moment.utc(timeDiff).format("hh:mm:ss");
  }
}

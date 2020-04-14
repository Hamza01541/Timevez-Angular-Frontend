import { Component, OnInit } from '@angular/core';
import { AlertService, LoaderService, AttendanceService } from 'src/app/core/services';
import { filterModel, dateTypesEnum } from "src/app/models/filter";
import flatpickr from "flatpickr";
declare var jQuery: any;

@Component({
  selector: 'timesheet-component',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})

export class timesheetComponent implements OnInit {

  fullname: string;
  userAttendance: any = [];
  userId: number;
  attendanceFilterModel: filterModel;

  attendanceTypes: any[] = [
    { value: dateTypesEnum.currentDate, name: 'Current Date' },
    { value: dateTypesEnum.currentMonth, name: 'Current Month' },
    { value: dateTypesEnum.lastMonth, name: 'Last Month' },
    { value: dateTypesEnum.currentYear, name: 'Current Year' },
    { value: dateTypesEnum.lastYear, name: 'Last Year' },
    { value: dateTypesEnum.custom, name: 'Custom' }
  ];

  constructor(
    private alertService: AlertService,
    private loaderService: LoaderService,
    private attendanceService: AttendanceService,
  ) {
    this.attendanceFilterModel = new filterModel();
  }

  ngOnInit() {

  this.attendanceFilterModel.type=dateTypesEnum.currentDate;
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.fullname = `${currentUser.firstname} ${currentUser.lastname}`
    this.getUserAttendance(currentUser.userId);
    this.flatPickrInit();
  }

  flatPickrInit() {
    const startdate = flatpickr("#startdate", {
      dateFormat: "d.m.Y",
    });
    const enddate = flatpickr("#enddate", {
      dateFormat: "d.m.Y",
    });
  }

  getUserAttendance(id) {
    this.userId = id;
    let pageNumber: number = 1
    this.attendanceService.getUserAttendance(id, pageNumber,this.attendanceFilterModel).subscribe((attendance: any) => {
      this.userAttendance = attendance.data;
    });
  }

  filterAttendance() {
    let pageNumber = 1;
    if (this.attendanceFilterModel.type == dateTypesEnum.custom) {
      this.attendanceService.getUserAttendance(this.userId, pageNumber, this.attendanceFilterModel).subscribe((attendance: any) => {
        this.userAttendance = attendance.data;
      });
    }
    else {
      this.attendanceService.getUserAttendance(this.userId, pageNumber, this.attendanceFilterModel).subscribe((attendance: any) => {
        this.userAttendance = attendance.data;
      });
    }
  }

  getAvailableTime(attendance) {
    var timeDiff = new Date(attendance.checkOut).getTime() - new Date(attendance.checkIn).getTime();

    if (attendance.breakStartTime && attendance.breakEndTime) {
      var breakDiff = new Date(attendance.breakEndTime).getTime() - new Date(attendance.breakStartTime).getTime();
      timeDiff = timeDiff - breakDiff;
    }

    return timeDiff;
  }
}

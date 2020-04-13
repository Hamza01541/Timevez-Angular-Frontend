import { Component, OnInit } from '@angular/core';
import { AlertService, LoaderService, AttendanceService } from 'src/app/core/services/';
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
  startDate: string;
  endDate: string;
  showDate: boolean = true;
  userId: number;

  constructor(
    private alertService: AlertService,
    private loaderService: LoaderService,
    private attendanceService: AttendanceService,
  ) {
  }

  ngOnInit() {
    const sd = flatpickr("#enddate", {
      dateFormat: "d.m.Y",
    });
    const ed = flatpickr("#startdate", {
      dateFormat: "d.m.Y",
    });
    this.userAttendance = [];
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.fullname = `${currentUser.firstname} ${currentUser.lastname}`
    this.getUserAttendance(currentUser.userId);
  }

  getUserAttendance(id) {
    this.userId = id;
    let pageindex: number = 1
    let type = "currentDate"
    this.attendanceService.getUserAttendance(pageindex, id, type).subscribe((attendance: any) => {
      this.userAttendance = attendance.data;
    });

  }

  filterAttendance(event) {
    let pageindex: number = 1
    let filterType = {
      type: event.target.value,
      startDate: '',
      endDate: '',
    }
    if (event.target.value) {
      if (event.target.value == "custom") {
        this.showDate = false;
        filterType.startDate = this.startDate;
        filterType.endDate = this.endDate;
        this.attendanceService.getUserAttendance(pageindex, this.userId, filterType).subscribe((attendance: any) => {
          this.userAttendance = attendance.data;
        });
      }
      else {
        filterType.startDate = '';
        filterType.endDate = '';
        this.startDate='';
        this.endDate='';
        this.showDate = true;
        this.attendanceService.getUserAttendance(pageindex, this.userId, filterType).subscribe((attendance: any) => {
          this.userAttendance = attendance.data;
        });
      }
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

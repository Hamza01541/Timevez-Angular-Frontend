import { Component, OnInit } from '@angular/core';
import { AlertService, LoaderService, AttendanceService } from 'src/app/core/services/';

@Component({
  selector: 'timesheet-component',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})

export class timesheetComponent implements OnInit {
  fullname: string;
  userAttendance: any = [];

  constructor(
    private alertService: AlertService,
    private loaderService: LoaderService,
    private attendanceService: AttendanceService,
  ) {
  }

  ngOnInit() {
    this.userAttendance = [];
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.fullname = `${currentUser.firstname} ${currentUser.lastname}`
    this.getUserAttendance(currentUser.userId);
  }

  getUserAttendance(userId) {

    let pageindex: number = 1
    this.attendanceService.getUserAttendance(pageindex, userId).subscribe((attendance: any) => {

      this.userAttendance = attendance.data;
    });

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

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService, AlertService, LoaderService, AttendanceService, LeaveService } from 'src/app/core/services/index';
import { filterModel, dateTypesEnum } from "src/app/models/filter";
import flatpickr from "flatpickr";
@Component({
  selector: 'app-dashboard-form',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  totalUsers: number;
  totalPresent: number;
  totalAbsent: number;
  totalLeave: number;
  isHidden: boolean = true;
  filterModel: filterModel;


  attendanceTypes: any[] = [
    { value: dateTypesEnum.currentDate, name: 'Current Date' },
    { value: dateTypesEnum.currentMonth, name: 'Current Month' },
    { value: dateTypesEnum.lastMonth, name: 'Last Month' },
    { value: dateTypesEnum.currentYear, name: 'Current Year' },
    { value: dateTypesEnum.lastYear, name: 'Last Year' },
    { value: dateTypesEnum.custom, name: 'Custom' }
  ];


  constructor(
    private userService: UserService,
    private attendanceService: AttendanceService,
    private leaveService: LeaveService,
    private alertService: AlertService,
    private loaderService: LoaderService


  ) {
    this.filterModel = new filterModel();

  }

  ngOnInit() {
    this.filterModel.type = dateTypesEnum.currentDate;
    this.flatPickrInit();
    this.getTotalUsers();
  }

  flatPickrInit() {
    const enddate = flatpickr("#enddate", {
      dateFormat: "d.m.Y",
    });
    const startdate = flatpickr("#startdate", {
      dateFormat: "d.m.Y",
    });

  }



  getTotalUsers() {
    this.userService.getTotalUsers(this.filterModel).subscribe((users: any) => {
      this.totalUsers = users.total;
    });
    this.getTotalPresent();
  }

  getTotalPresent() {
    this.attendanceService.getTotalAttendance(this.filterModel, true).subscribe((present: any) => {
      this.totalPresent = present.total;
    });
    this.getTotalAbsent();

  }

  getTotalAbsent() {
    this.attendanceService.getTotalAttendance(this.filterModel, false).subscribe((absent: any) => {
      this.totalAbsent = absent.total;
    });
    this.getTotalLeave();
  }

  getTotalLeave() {
    this.leaveService.getTotalLeave(this.filterModel, status).subscribe((leave: any) => {
      this.totalLeave = leave.total;
    });

  }

  filterAttendance() {

    if (this.filterModel.type == dateTypesEnum.custom) {
      this.isHidden = false;
    }
    else {
      this.isHidden = true;
      this.filterModel.endDate ='';
      this.filterModel.startDate='';
      this.getTotalUsers();
    }
  }

  filterResult() {
    this.getTotalUsers();
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

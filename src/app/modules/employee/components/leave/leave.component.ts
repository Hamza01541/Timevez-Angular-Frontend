import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { attendence } from "src/app/models/attendence";
import { AlertService, LoaderService, AttendanceService, UserService } from 'src/app/core/services/index';
import { leave } from "src/app/models/leave";
import flatpickr from "flatpickr";



@Component({
  selector: 'leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss']
})
export class LeaveComponent implements OnInit {

  model: leave;

  constructor(
    private alertService: AlertService,
    private loaderService: LoaderService,
    private attendanceService: AttendanceService,

  ) {
    this.model = new leave();

  }

  ngOnInit() {

    console.log("flatPicker", flatpickr)

  }


  leaveType(event) {
    if (event.target.value) {
      this.model.leaveType = event.target.value;
    }
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

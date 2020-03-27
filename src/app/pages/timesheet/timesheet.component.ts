import { Component, OnInit } from '@angular/core';
import { AlertService, LoaderService, AttendanceService } from 'src/app/core/services/';



@Component({
  selector: 'timesheet-component',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class timesheetComponent implements OnInit {
fullname: string;

  constructor(
    private alertService: AlertService,
    private loaderService: LoaderService,
    private attendanceService: AttendanceService,
  ) {
  }

  ngOnInit() {
     let currentUser = JSON.parse(localStorage.getItem('currentUser'));
     this.fullname = `${currentUser.firstname} ${currentUser.lastname}`
  }

  /**
   * Checkin user
   */
  checkIn() {
    this.showLoader();
    this.attendanceService.checkIn().subscribe((result: any) => {
      this.hideLoader();
      this.alertService.successToastr(`Good Morning ${this.fullname}!`, false);
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
      this.alertService.successToastr(`Good Night ${this.fullname}!`, false);
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
      this.alertService.successToastr(`See you soon ${this.fullname}!`, false);
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
      this.alertService.successToastr(`Welcome back ${this.fullname}!`, false);
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

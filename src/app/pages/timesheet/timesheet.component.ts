import { Component, OnInit } from '@angular/core';
import { AlertService, LoaderService, AttendanceService } from 'src/app/core/services/';



@Component({
  selector: 'timesheet-component',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class timesheetComponent implements OnInit {
  obj: any = {}


  constructor(
    private alertService: AlertService,
    private loaderService: LoaderService,
    private attendanceService: AttendanceService,
  ) {
  }

  ngOnInit() {


  }

  checkIn() {
    this.attendanceService.checkIn(this.obj).subscribe((result: any) => {

      this.alertService.successToastr("Successfully Clocked In", false);
    }, error => {
      this.hideLoader();
      this.alertService.warningToastr("Already Clocked In", false);
    });

  }

  checkOut() {
    this.attendanceService.checkOut(this.obj).subscribe((result: any) => {
      this.alertService.successToastr("Successfully Checked Out", false);
    }, error => {
      this.hideLoader();
      this.alertService.warningToastr("Already Checekd Out", false);
    });

  }

  breakStart() {
    this.attendanceService.startBreak(this.obj).subscribe((result: any) => {
      this.alertService.successToastr("Break Started", false);
    }, error => {
      this.hideLoader();
      this.alertService.warningToastr("Break Started already", false);
    });
  }

  breakEnd() {
    this.attendanceService.endBreak(this.obj).subscribe((result: any) => {
      this.alertService.successToastr(" Sucessfully Break End", false);
    }, error => {
      this.hideLoader();
      this.alertService.warningToastr("Break Ended already", false);
    });
  }


  showLoader() {
    this.loaderService.show();
  }

  hideLoader() {
    this.loaderService.hide();
  }
}

import { Component, OnInit } from '@angular/core';
import { AlertService, LoaderService, LeaveService, LocalStorageService } from 'src/app/core/services';
import { leave } from "src/app/models";
import { leaveTypeEnum, } from "src/app/models/filter";
import flatpickr from "flatpickr";

@Component({
  selector: 'leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss']
})
export class LeaveComponent implements OnInit {

  model: leave;

  leaveTypes: any[] = [
    { value: leaveTypeEnum.sickLeave, name: 'Sick Leave' },
    { value: leaveTypeEnum.weedingLeave, name: 'Weeding Leave' },
    { value: leaveTypeEnum.personalLeave, name: 'Personal Leave' },
    { value: leaveTypeEnum.bereavement, name: 'Bereavement Leave' },
    { value: leaveTypeEnum.examsLeave, name: 'Exams Leave' },
    { value: leaveTypeEnum.emergencyLeave, name: 'Emergency Leave' }
  ];

  constructor(
    private alertService: AlertService,
    private loaderService: LoaderService,
    private leaveService: LeaveService,
    private storageService: LocalStorageService

  ) {
    this.model = new leave();

  }

  ngOnInit() {
    const user = this.storageService.get('currentUser');
    this.model.userId = user.userId;
    this.flatPickrInit()
  }

  /**
      * Flat Pickr 
      * This will allow to open date pickr on input fied through Id
      */

  flatPickrInit() {
    const startDate = flatpickr("#startdate", {
      dateFormat: "d.m.Y",
    }); const endDate = flatpickr("#enddate", {
      dateFormat: "d.m.Y",
    });

  }

  /**
     * Request for Leave 
     * It Submit the object to leave Request endpoint
     */
  leaveRequest() {
    this.leaveService.requestleave(this.model).subscribe((leave: any) => {
      this.alertService.successToastr(`Requested Leave  Sucessflly`, false);
    }, error => {
      this.alertService.errorToastr(`Error In Submission request for leave`, false);
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

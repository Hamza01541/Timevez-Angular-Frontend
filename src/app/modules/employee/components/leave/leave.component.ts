import { Component, OnInit } from '@angular/core';
import { AlertService, LoaderService, LeaveService, LocalStorageService } from 'src/app/core/services';
import { Leave } from "src/app/models";
import { Router } from '@angular/router';
import { leaveType, } from "src/app/models/filter";
import { Constants } from 'src/shared/constants';

@Component({
  selector: 'leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss']
})

export class LeaveComponent implements OnInit {
  leaveTypes: any[];
  leave: Leave;

  // Timepicker Properties
  minStartDate = new Date();
  minEndDate = new Date();

  constructor(
    private alertService: AlertService,
    private router: Router,
    private loaderService: LoaderService,
    private leaveService: LeaveService,
    private storageService: LocalStorageService,
  ) {
    this.leave = new Leave();
  }

  ngOnInit() {
    const user = this.storageService.get(Constants.currentUser);
    this.leave.userId = user.userId;
    this.leaveTypes = [
      { value: leaveType.casual, name: 'Casual' },
      { value: leaveType.annual, name: 'Annual' },
    ];
  }

  /**
     * Request for Leave 
     * It Submit the object to leave Request endpoint
     */
  leaveRequest() {
    this.leaveService.requestleave(this.leave).subscribe((leave: any) => {
      this.alertService.successToastr(`Requested Leave  Sucessflly`, false);
      this.router.navigate(['/employee/dashboard']);
    }, error => {
      if(error && error.error && error.error.message){
        this.alertService.errorToastr(error.error.message);
      }
    });
  }

  startDateSelected(){
    console.log("startDateSelected()-called");
      this.minEndDate = new Date(this.leave.startDate);
      this.leave.endDate = null;
  }
  
  endDateSelected(endDate:any){
    console.log("endDateSelected()-called");
  }

  test(param:any){
    console.log("param:",param);
  }

  getValidationClass(ele: any){
     return {'is-valid': ele.valid && ele.value && ele.value.trim().length, 'is-invalid': ele.invalid && (ele.dirty || ele.touched) && (!ele.value || (ele.value && !ele.value.trim().length))};
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

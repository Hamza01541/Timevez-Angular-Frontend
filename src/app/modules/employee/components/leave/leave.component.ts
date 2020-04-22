import { Component, OnInit } from '@angular/core';
import { AlertService, LoaderService, LeaveService, LocalStorageService } from 'src/app/core/services';
import { leave } from "src/app/models";
import { Router, ActivatedRoute } from '@angular/router';
import { leaveType, } from "src/app/models/filter";
import { Constants } from 'src/shared/constants';

@Component({
  selector: 'leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss']
})

export class LeaveComponent implements OnInit {

  model: leave;

  leaveTypes: any[] = [
    { value: leaveType.casual, name: 'Casual' },
    { value: leaveType.annual, name: 'Annual' },
  ];

  constructor(
    private alertService: AlertService,
    private router: Router,
    private loaderService: LoaderService,
    private leaveService: LeaveService,
    private storageService: LocalStorageService

  ) {
    this.model = new leave();

  }

  ngOnInit() {
    const user = this.storageService.get(Constants.currentUser);
    this.model.userId = user.userId;
  }

 
  /**
     * Request for Leave 
     * It Submit the object to leave Request endpoint
     */
  leaveRequest() {
    this.leaveService.requestleave(this.model).subscribe((leave: any) => {
      this.alertService.successToastr(`Requested Leave  Sucessflly`, false);
      this.router.navigate(['/employee/dashboard']);
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

import { Component, OnInit } from '@angular/core';
import { AlertService, LoaderService } from '../../app/core/services/index';



@Component({
  selector: 'timesheet-component',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class timesheetComponent implements OnInit {

 

  constructor(
    private alertService: AlertService,
    private loaderService: LoaderService,
  ) {
  }

  ngOnInit() {


  }

  checkIn(){


  }

  checkOut(){


  }

  timeIn(){


  }

  timeOut(){
      
  }
 

  showLoader() {
    this.loaderService.show();
  }

  hideLoader() {
    this.loaderService.hide();
  }
}

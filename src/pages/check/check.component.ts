import { Component, OnInit } from '@angular/core';
import { AlertService, LoaderService } from '../../app/core/services/index';



@Component({
  selector: 'check-component',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {

 

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

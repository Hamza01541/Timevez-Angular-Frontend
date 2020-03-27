import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { attendence } from "src/app/models/attendence";
import { AlertService, LoaderService, AttendanceService, UserService } from 'src/app/core/services/index';


@Component({
  selector: 'app-attendance-form',
  templateUrl: './attendance-form.component.html',
  styleUrls: ['./attendance-form.component.scss']
})
export class AttendanceFormComponent implements OnInit {
  // Max moment: January 1 2020, 20:30
  public min = new Date(2020, 0, 1, 10, 30);
  // Max moment: April 1 2020, 20:30
  public max = new Date(2020, 3, 1, 20, 30);
  //First day of week starts from Monday on Value 1
  firstDayofWeek = 1;
  //12 Hour Timer Set if true
  hour12Timer = true;
  //Picker Mode Opening style of Time Picker Like, (Default)PopUp & Dialog
  pickerMode = "popup";


  model: attendence;

  users: any[];
  date: string;
  id: number;
  operation = "add";


  constructor(
    private userService: UserService,
    private attendanceService: AttendanceService,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private loaderService: LoaderService,
    private router: Router,
  ) {

    this.model = new attendence();
  }

  ngOnInit() {
    this.id = this.route.snapshot.queryParams['id'] || null;

    this.getUsers();
    this.getAttendanceById(this.id);
  }

  save() {
    this.showLoader();
    this.operation = this.id ? 'updateData' : 'addData';
    this.showLoader();
    this.attendanceService[this.operation](this.model).subscribe(res => {
      this.hideLoader();
      this.alertService.successToastr(`SuccessFully ${this.operation} Of Attendance`, false);
      this.router.navigate(['/admin/attendance']);
    });
  }

  getAttendanceById(attendanceId:number) {
    this.attendanceService.getById(attendanceId).subscribe((attendance: any) => {
      this.model = attendance.data;
    });
  }

  getUsers() {
    this.userService.getData().subscribe((users: any) => {
      this.users = [];
      users.data.forEach(user => {
        let temp = { "value": user._id, "label": `${user.firstname} ${user.lastname}` };
        this.users.push(temp);
      })
    });
  }

  showLoader() {
    this.loaderService.show();
  }

  hideLoader() {
    this.loaderService.hide();
  }
}

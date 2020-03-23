import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { attendence } from "src/app/models/attendence";


@Component({
    selector: 'app-attendence-form',
    templateUrl: './attendence-form.component.html',
    styleUrls: ['./attendence-form.component.scss']
})
export class AttendenceFormComponent implements OnInit {
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


    constructor(
    ) {

        this.model = new attendence();
    }

    ngOnInit() {

    }

    save() {



    }
}


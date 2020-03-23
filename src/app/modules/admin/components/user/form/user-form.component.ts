import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { signUp,rolesType } from "src/app/models/signup";


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {


  model: signUp;
  rolesTypes: any[] = [
    { label: rolesType.admin },
    { label: rolesType.employee }
  ];

  constructor(
  ) {
    this.model = new signUp();

  }

  ngOnInit() {

  }

  save() {



  }
}


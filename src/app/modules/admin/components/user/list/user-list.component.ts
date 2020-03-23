import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { GridComponent } from 'src/shared/components/index';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
    @ViewChild(GridComponent) gridComponent: GridComponent;

    jscolumnDefs: any[];
    users: any[];
    totalUsers: number;
    jsfilter: any = {};
    selectedRowId;
    isShowAdd: boolean = false;




    constructor(
        private router: Router,
        public dialog: MatDialog) { }


    ngOnInit() {
        this.getGridData();
    }

    getGridData() {
        this.getColumnDefs();
        this.getUsers();
    }

    //initialize grid
    getColumnDefs() {
        const _this = this;
        this.jscolumnDefs = [
            {
                title: 'Name', name: "firstName", width: 75, itemTemplate: function (__, user) {
                    return `${user.firstName} ${user.lastName}`;
                }
            },
            { title: 'User Name', width: 92, name: 'username' },
            { title: 'Roles', width: 50, name: 'roles' },
            { title: 'Country', width: 44, name: 'country' },
            { title: 'City', width: 50, name: 'city' },
            { title: 'Email', width: 92, name: 'email' },
            { title: 'Phone Number', width: 60, name: 'phoneNumber' },
            {
                title: 'Active', width: 50, name: 'active', itemTemplate: function (active) {
                    var iconClass = "";
                    if (active == true) {
                        iconClass = "fa fa-check";
                    }
                    else {
                        iconClass = "fa fa-close";
                    }
                    return $("<span>").attr("class", iconClass);
                }
            },

        ];
    }

    performCurdOperation(action, id) {

    }

    /**
     * Open confirmation dialogue.
     * On confirmation, deletes selected row of grid.
     */
    //   openDialog() {
    //     const dialogRef = this.dialog.open(ConfirmationDialogueComponent, {
    //       width: '250px',
    //       data: {
    //         message: 'Want to Delete Data?'
    //       }
    //     });

    // if (dialogRef) {
    //   dialogRef.afterClosed().subscribe(result => {
    //     if (result) {
    //       this.performCurdOperation('hardDelete', this.selectedRowId);
    //     }
    //   });
    // }
    //   }


    getUsers(pageindex: number = 1) {



        let data = {
            "data": [
                {
                    "id": "01608381-2cec-471e-b034-d19ec108b607",
                    "username": "test@foodvez.com",
                    "firstName": "Testing",
                    "lastName": "Testing",
                    "email": "test@foodvez.com",
                    "password": "AQAAAAEAACcQAAAAEJABaDtRGm+MPz43uucFTueWqLkfU4IH34WLfpKsiF3TLSz7a5iz3jb+WCVS7T7aOQ==",
                    "country": "Pakistan",
                    "city": "Multan",
                    "phoneNumber": "70740430882",
                    "roleName": null,
                    "roles": [
                        "Customer"
                    ],
                    "token": null,
                    "connectionId": null,
                    "createdDate": "0001-01-01T00:00:00",
                    "modifiedDate": null,
                    "createdBy": null,
                    "modifiedBy": null,
                    "active": true
                },
                {
                    "id": "67440bc3-a3c6-481f-b279-790ca300e3d7",
                    "username": "ali@gmail.com",
                    "firstName": "ali",
                    "lastName": "Aqib",
                    "email": "ali@gmail.com",
                    "password": "AQAAAAEAACcQAAAAEFTe13o6QaICkQxBeZ0jZiNyK932WGstTJHfYs/ajRl1nDl/PDOvwoaavGA+FU89zQ==",
                    "country": "Pakistan",
                    "city": "Multan",
                    "phoneNumber": "11212221111",
                    "roleName": null,
                    "roles": [
                        "Staff"
                    ],
                    "token": null,
                    "connectionId": null,
                    "createdDate": "0001-01-01T00:00:00",
                    "modifiedDate": null,
                    "createdBy": null,
                    "modifiedBy": null,
                    "active": true
                },
                {
                    "id": "ab5261ca-0546-4c72-ad21-d9fd80270e0c",
                    "username": "sr.zohaibamin@gmail.com",
                    "firstName": "zohab",
                    "lastName": "amin",
                    "email": "sr.zohaibamin@gmail.com",
                    "password": "AQAAAAEAACcQAAAAEP5BgE0Uw/Bbhc36fhTY7U6UnkU43JhGcNrsYAwSfQpKFtauXozpWo8zIyXga5v26Q==",
                    "country": "Pakistan",
                    "city": "Multan",
                    "phoneNumber": "03007321257",
                    "roleName": null,
                    "roles": [
                        "Customer"
                    ],
                    "token": null,
                    "connectionId": null,
                    "createdDate": "0001-01-01T00:00:00",
                    "modifiedDate": null,
                    "createdBy": null,
                    "modifiedBy": null,
                    "active": true
                },
                {
                    "id": "e1b6d1b9-e653-40b1-8e4d-51a174b1d89f",
                    "username": "Bilal@gmail.com",
                    "firstName": "Bilal",
                    "lastName": "Aqib",
                    "email": "Bilal@gmail.com",
                    "password": "AQAAAAEAACcQAAAAEGRP7BkQ1eH+SYhs7lauT5I8VVfYQyQGVD2qVvt4DuWkuFWyJE3LtlXNB3Nwh0c4MQ==",
                    "country": "Pakistan",
                    "city": "Multan",
                    "phoneNumber": "34343243433",
                    "roleName": null,
                    "roles": [
                        "Staff"
                    ],
                    "token": null,
                    "connectionId": null,
                    "createdDate": "0001-01-01T00:00:00",
                    "modifiedDate": null,
                    "createdBy": null,
                    "modifiedBy": null,
                    "active": true
                },
                {
                    "id": "ee3e59de-baf9-4ee7-8e0b-bef2f72c7238",
                    "username": "hamzashahzad@gmail.com",
                    "firstName": "Hamza",
                    "lastName": "Shahzad",
                    "email": "hamzashahzad@gmail.com",
                    "password": "AQAAAAEAACcQAAAAEG5tmbj1LxcYqp+NQgPhBLTWfM0S3EkG9smJkVrnG7vGnVcJ9CNrF9wvPWvrtskkdA==",
                    "country": "Pakistan",
                    "city": "Multan",
                    "phoneNumber": "11123456432",
                    "roleName": null,
                    "roles": [
                        "Staff"
                    ],
                    "token": null,
                    "connectionId": null,
                    "createdDate": "0001-01-01T00:00:00",
                    "modifiedDate": null,
                    "createdBy": null,
                    "modifiedBy": null,
                    "active": true
                }
            ],
            "total": 5
        }

        this.users = data.data;
        this.totalUsers = data.total;

    }

    performOperation(event: any) {
        switch (event.action) {
            case 'add':
              this.router.navigate(['/admin/user-form']);
              break;
           
          }


    }

}
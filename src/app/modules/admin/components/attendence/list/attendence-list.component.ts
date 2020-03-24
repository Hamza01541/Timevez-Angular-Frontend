import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { GridComponent } from 'src/shared/components/index';
import { AlertService, LoaderService, AttendanceService } from 'src/app/core/services/index';

@Component({
    selector: 'app-attendence-list',
    templateUrl: './attendence-list.component.html',
    styleUrls: ['./attendence-list.component.scss']
})
export class AttendenceListComponent implements OnInit {
    @ViewChild(GridComponent) gridComponent: GridComponent;

    jscolumnDefs: any[];
    attendance: any[];
    totalAttendance: number;
    jsfilter: any = {};
    selectedRowId;
    isShowAdd: boolean = false;




    constructor(
        private router: Router,
        private attendanceService: AttendanceService,
        private alertService: AlertService,
        private loaderService: LoaderService,
        
        public dialog: MatDialog) { }


    ngOnInit() {
        this.getGridData();
    }

    getGridData() {
        this.getColumnDefs();
        this.getAttendance();
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


    getAttendance(pageindex: number = 1) {

        this.attendanceService.getData().subscribe((attendanceList: any) => {
            console.log("attendance", attendanceList);
            this.attendance = attendanceList.data;
            this.totalAttendance = attendanceList.total;

        }), error => {
            this.hideLoader();
            this.alertService.errorToastr("Error in Getting Attendance.", false);
        }
    }

    performOperation(event: any) {
        switch (event.action) {
            case 'add':
                this.router.navigate(['/admin/attendence-form']);
                break;
        }
    }

    showLoader() {
        this.loaderService.show();
    }

    hideLoader() {
        this.loaderService.hide();
    }

}
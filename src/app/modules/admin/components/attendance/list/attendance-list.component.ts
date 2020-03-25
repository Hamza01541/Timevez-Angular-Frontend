import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { GridComponent } from 'src/shared/components/index';
import { AlertService, LoaderService, AttendanceService } from 'src/app/core/services/index';

@Component({
    selector: 'app-attendance-list',
    templateUrl: './attendance-list.component.html',
    styleUrls: ['./attendance-list.component.scss']
})
export class AttendanceListComponent implements OnInit {
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

            { title: 'Check In', width: 92, name: 'checkIn' },

            { title: 'Date', width: 44, name: 'date' },
            {
                title: 'Status', width: 50, name: 'status', itemTemplate: function (active) {
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
            {
                title: 'Action', width: 70, itemTemplate: (__, data) => {

                    this.selectedRowId = data.id;
                    const updateIcon = $("<span data-toggle='tooltip' data-placement='bottom' title='Edit'>").append("<i class='fa fa-pencil-square-o mr-3'  >").on("click", () => this.performCurdOperation('update', data.id));
                    const deleteIcon = $("<span data-toggle='tooltip' data-placement='bottom' title='Disabled'>").append("<i class='fa fa-trash-o mr-3'>").on("click", () => this.performCurdOperation('delete', data.id));
                    // const hardDeleteIcon = $("<span data-toggle='tooltip' data-placement='bottom' title='Delete'>").append("<i class='fas fa-trash-alt mr-3'>").on("click", () => this.openDialog());
                    return $("<span>").append(updateIcon).append(deleteIcon);
                }
            }

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
                this.router.navigate(['/admin/attendance-form']);
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

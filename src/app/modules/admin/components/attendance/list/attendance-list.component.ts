import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { GridComponent,ConfirmationDialogueComponent } from 'src/shared/components/index';
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

    /**
       * Call the ColumnDefs and Roles.
       */
    getGridData() {
        this.getColumnDefs();
        this.getAttendance();
    }

    /**
         * Initializing the Grid with Data
         */
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
                    const deleteIcon = $("<span data-toggle='tooltip' data-placement='bottom' title='Disabled'>").append("<i class='fa fa-trash-o mr-3'>").on("click", () => this.openDialog());
                    return $("<span>").append(updateIcon).append(deleteIcon);
                }
            }
        ];
    }

    /**
     * Perform Update or Delete Operation.
     */
    performCurdOperation(action, id) {
        switch (action) {
            case 'update':
                // this.router.navigate(['/admin/attendance-form'], { queryParams: { id: this.selectedRowId } });
                break;
            case 'delete':
                this.showLoader();
                this.attendanceService.deleteData(id).subscribe(res => {
                    this.hideLoader();
                    this.alertService.successToastr("Selected Attendance Deleted Successfully.", false);
                    this.gridComponent.deleteRowListener(id);
                }, error => {
                    this.hideLoader();
                    this.alertService.errorToastr("Error in Deleting Attendance.", false);
                });
                break;
        }
    }

    /**
     * Open confirmation dialogue.
     * On confirmation, deletes selected row of grid.
     */
    openDialog() {
        console.log("here");
        const dialogRef = this.dialog.open(ConfirmationDialogueComponent, {
            width: '250px',
            data: {
                message: 'Want to Delete Data?'
            }
        });

        if (dialogRef) {
            dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    this.performCurdOperation('delete', this.selectedRowId);
                }
            });
        }
    }

    /**
     * Get Attendance on the base of page index.
     */
    getAttendance(pageindex: number = 1) {
        this.attendanceService.getPagedAttendance(pageindex).subscribe((attendanceList: any) => {
            this.attendance = attendanceList.data;
            this.totalAttendance = attendanceList.total;
        }), error => {
            this.hideLoader();
            this.alertService.errorToastr("Error in Getting Attendance.", false);
        }
    }

    /**
    * Perform Add Operation
    */
    performOperation(event: any) {
        switch (event.action) {
            case 'add':
                this.router.navigate(['/admin/attendance-form']);
                break;
        }
    }

    /**
 * Show the loader screen
 */
    showLoader() {
        this.loaderService.show();
    }

    /**
  * Hide the Loader Screen
  */
    hideLoader() {
        this.loaderService.hide();
    }
}

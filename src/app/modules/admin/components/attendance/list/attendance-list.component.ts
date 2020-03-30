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
            {
                title: 'Name', name: "fullname", width: 75, itemTemplate: function (__, attendance) {
                    return attendance.user ? `${attendance.user.firstname} ${attendance.user.lastname}`: '';
                }},
            { title: 'Checkin', width: 92, name: 'checkIn', itemTemplate: function (__, attendance) {
                return new Date(attendance.checkIn).toLocaleTimeString('en-US');
            }},
            { title: 'Break Start', width: 92, name: 'breakStartTime', itemTemplate: function (__, attendance) {
                return attendance.breakStartTime? new Date(attendance.breakStartTime).toLocaleTimeString('en-US'):'';
            }},
            { title: 'Break End', width: 92, name: 'breakEndTime', itemTemplate: function (__, attendance) {
                return attendance.breakEndTime ? new Date(attendance.breakEndTime).toLocaleTimeString('en-US'): '';
            }},
            { title: 'Checkout', width: 92, name: 'checkOut', itemTemplate: function (__, attendance) {
                return attendance.checkOut ? new Date(attendance.checkOut).toLocaleTimeString('en-US'):'';
            }},
            { title: 'Date', width: 60, name: 'date', itemTemplate: function (__, attendance) {
                return new Date(attendance.date).toLocaleDateString('en-GB', {day: '2-digit', month: 'short', year: 'numeric', weekday:'short'})
            }},
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
                    const updateIcon = $("<span data-toggle='tooltip' data-placement='bottom' title='Edit'>").append("<i class='fa fa-pencil-square-o mr-3'  >").on("click", () => this.performCurdOperation('update', data._id));
                    const deleteIcon = $("<span data-toggle='tooltip' data-placement='bottom' title='Disabled'>").append("<i class='fa fa-trash-o mr-3'>").on("click", () => this.openDialog(data._id));
                    return $("<span>").append(updateIcon).append(deleteIcon);
                }
            }
        ];
    }

    /**
     * Perform Update or Delete Operation.
     */
    performCurdOperation(action:string, selectedRowId: number) {     
        switch (action) {
            case 'update':
                this.router.navigate(['/admin/attendance-form'], { queryParams: { id: selectedRowId } });
                break;
            case 'delete':
                this.showLoader();
                this.attendanceService.deleteData(selectedRowId).subscribe(res => {
                    this.hideLoader();
                    this.alertService.successToastr("Selected Attendance Deleted Successfully.", false);
                    this.gridComponent.deleteRowListener(selectedRowId);
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
    openDialog(selectedRowId:number) {
        const dialogRef = this.dialog.open(ConfirmationDialogueComponent, {
            width: '250px',
            data: {
                message: 'Want to Delete Selected Record?'
            }
        });

        if (dialogRef) {
            dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    this.performCurdOperation('delete', selectedRowId);
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

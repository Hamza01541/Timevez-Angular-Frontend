import { Injectable } from '@angular/core';
import { RequestService } from "./request.service";
import { ApiUrl } from 'src/shared/resource-references';
import { Attendence } from "src/app/models";

@Injectable({
    providedIn: 'root'
})
export class AttendanceService {
    attendance: string = `${ApiUrl.attendance}`;

    constructor(private RequestService: RequestService) { }

    /**
   * Get list of Attendence
   * It Returns the Object 
   */
    getData() {
        const url = `${this.attendance}/${ApiUrl.list}`;
        return this.RequestService.getData(url);
    }

    /**
   * Get Detail of Attendence
   * It Returns the Object of Attendence Detail
   */
    getAttendencedDetail() {
        const url = `${this.attendance}/${ApiUrl.detail}`;
        return this.RequestService.getData(url);
    }

    /**
   * Get Attendence Detail By Id
   * @param id  Returns the Attendence Detail on specific Id
   */
    getAttendencedDetailById(id: string) {
        const url = `${this.attendance}/${ApiUrl.detail}`;
        return this.RequestService.getData(url + id);
    }

    /**
        * Add Data to Attendece
        * @param attendance is the object to be added 
        */
    addData(attendance: Attendence) {
        const url = `${this.attendance}/${ApiUrl.add}`;
        return this.RequestService.addData(url, attendance)
    }

    /**
        *Get Data of Attendence By Id
        * @param id Returns the attendence list on Specific Id
        */
    getById(id: string) {
        const url = `${this.attendance}/${ApiUrl.list}/`;
        return this.RequestService.getData(url + id);
    }

    /**
        *Update Data of Attendence By Id
        * @param attendance is the object to update the data
        */
    updateData(attendance: Attendence) {
        const url = `${this.attendance}/${ApiUrl.update}/${attendance._id}`;
        return this.RequestService.updateData(url, attendance);
    }

    /**
          *Delete Data of Attendence By Id
          * @param id is to delete attendence data 
          */
    deleteData(id: string) {
        const url = `${this.attendance}/${ApiUrl.delete}`;
        return this.RequestService.deleteData(url, id);
    }

    /**
 * Return  attandance 
 * @param pageNumber is to get page based data 
 */
    getPagedAttendance(pageNumber: number) {
        const url = `${this.attendance}/${ApiUrl.getPagedAttendances}/${pageNumber}`;
        return this.RequestService.getData(url);
    }

    /**
     * Get paged user attendances
     * @param userId User id
     * @param pageNumber Current page number
     * @param filterType Filter type (i.e current Date, current month etc)
     * @param fromDate filter Start date
     * @param toDate filter end date
     * @param search Search string typed in search box.
     */
    getUserAttendance(userId: string, pageNumber: number, filterType: string, fromDate: string, toDate: string, search?: string) {
        const url = `${this.attendance}/${ApiUrl.getUserPageAttendance}?userId=${userId}&pageNo=${pageNumber}&type=${filterType}&fromDate=${fromDate}&toDate=${toDate}&search=${search}`;
        return this.RequestService.getData(url);
    }

    /**
     * Total number of attendance
     * It will return the total numer of  absent or present 
     */
    getTotalAttendance(filterType: string, fromDate: string, toDate: string) {
        const url = `${this.attendance}/${ApiUrl.totalCount}?type=${filterType}&fromDate=${fromDate}&toDate=${toDate}`;
        return this.RequestService.getData(url);
    }

    /**
     * Get user attendance count
     * @param userId User Id
     * @param filterType Filter type (i.e. currentdate, current month etc)
     * @param fromDate Attendance start date
     * @param toDate Attendance end date
     * @param active 1) If active = true, gets present count 2) If active = false, gets absent count 3) If active is not in param, gets both present and absent count.
     */
    getUserAttendanceCount(userId: string, filterType: string, fromDate: string, toDate: string, active?: boolean) {
        const url = `${this.attendance}/${ApiUrl.totalCountByUserId}?userId=${userId}&type=${filterType}&fromDate=${fromDate}&toDate=${toDate}&active=${active}`;
        return this.RequestService.getData(url);
    }

      /**
     * Check in employee
     */
    checkIn() {
        const url = `${this.attendance}/${ApiUrl.checkIn}`;
        return this.RequestService.addData(url);
    }

    /**
      *Start Break for Specific Employee 
      */
    startBreak() {
        const url = `${this.attendance}/${ApiUrl.startBreak}`;
        return this.RequestService.updateData(url);
    }

    /**
        *End Break for Specific Employee 
        */
    endBreak() {
        const url = `${this.attendance}/${ApiUrl.endBreak}`;
        return this.RequestService.updateData(url);
    }

     /**
      *Check Out for Attendence By  Employee Id
      */
     checkOut() {
        const url = `${this.attendance}/${ApiUrl.checkOut}`;
        return this.RequestService.updateData(url);
    }
}

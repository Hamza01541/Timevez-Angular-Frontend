import { Injectable } from '@angular/core';
import { RequestService } from "./request.service";
import { ApiUrl } from 'src/shared/resource-references';
import { Attendence } from "src/app/models";

@Injectable({
    providedIn: 'root'
})
export class AttendanceService {
    attendance:string = `${ApiUrl.attendance}`;

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
* Return  attandance 
* @param pageNumber is to get page based data 
*/
    getUserAttendance(userId: string, pageNumber: number, filterType: string, startDate: string, endDate: string) {
        const url = `${this.attendance}/${ApiUrl.getUserPageAttendance}?userId=${userId}&pageNo=${pageNumber}&type=${filterType}&startDate=${startDate}&endDate=${endDate}`;
        return this.RequestService.getData(url);
    }

    /**
          *Check In for Attendence By Employee Id
          */
    checkIn() {
        const url = `${this.attendance}/${ApiUrl.checkIn}`;
        return this.RequestService.addData(url);
    }

    /**
     * Total number of attendance
     * It will return the total numer of  absent or present 
     */
    getTotalAttendance(filterType: string, startDate: string, endDate: string) {
        const url = `${this.attendance}/${ApiUrl.totalCount}?type=${filterType}&startDate=${startDate}&endDate=${endDate}`;
        return this.RequestService.getData(url);
    }

    /**
      *Check Out for Attendence By  Employee Id
      */
    checkOut() {
        const url = `${this.attendance}/${ApiUrl.checkOut}`;
        return this.RequestService.updateData(url);
    }


    getUserAttendanceCount(userId: string, filterType: string, startDate: string, endDate: string) {
        const url = `${this.attendance}/${ApiUrl.totalCountByUserId}?userId=${userId}&type=${filterType}&startDate=${startDate}&endDate=${endDate}`;
        return this.RequestService.getData(url);
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
}

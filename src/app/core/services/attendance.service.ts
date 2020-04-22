import { Injectable } from '@angular/core';
import { RequestService } from "./request.service";
import { ApiUrl } from 'src/shared/resource-references';

@Injectable({
    providedIn: 'root'
})
export class AttendanceService {

    constructor(private RequestService: RequestService) { }

    attendance = `${ApiUrl.attendance}`;

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
    getAttendencedDetailById(id) {
        const url = `${this.attendance}/${ApiUrl.detail}`;
        return this.RequestService.getData(url + id);
    }

    /**
        * Add Data to Attendece
        * @param attendance is the object to be added 
        */
    addData(attendance) {
        const url = `${this.attendance}/${ApiUrl.add}`;
        return this.RequestService.addData(url, attendance)
    }

    /**
        *Get Data of Attendence By Id
        * @param id Returns the attendence list on Specific Id
        */
    getById(id) {
        const url = `${this.attendance}/${ApiUrl.list}/`;
        return this.RequestService.getData(url + id);
    }

    /**
        *Update Data of Attendence By Id
        * @param attendance is the object to update the data
        */
    updateData(attendance) {
        const url = `${this.attendance}/${ApiUrl.update}/${attendance.id}`;
        return this.RequestService.updateData(url, attendance);
    }

    /**
          *Delete Data of Attendence By Id
          * @param id is to delete attendence data 
          */
    deleteData(id) {
        const url = `${this.attendance}/${ApiUrl.delete}`;
        return this.RequestService.deleteData(url, id);
    }

    /**
 * Return  attandance 
 * @param pageNumber is to get page based data 
 */
    getPagedAttendance(pageNumber) {
        const url = `${this.attendance}/${ApiUrl.getPagedAttendances}/${pageNumber}`;
        return this.RequestService.getData(url);
    }

    /**
* Return  attandance 
* @param pageNumber is to get page based data 
*/
    getUserAttendance(userId, pageNumber, attendance, startDate, endDate) {
        const url = `${this.attendance}/${ApiUrl.getUserPageAttendance}?userId=${userId}&pageNo=${pageNumber}&type=${attendance.type}&startDate=${startDate}&endDate=${endDate}`;
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
    getTotalAttendance(model, present, startDate, endDate) {
        const url = `${this.attendance}/${ApiUrl.totalCount}?present=${present}&type=${model.type}&startDate=${startDate}&endDate=${endDate}`;
        return this.RequestService.getData(url);
    }

    /**
      *Check Out for Attendence By  Employee Id
      */
    checkOut() {
        const url = `${this.attendance}/${ApiUrl.checkOut}`;
        return this.RequestService.updateData(url);
    }


    getUserAttendanceCount(userId, present, model, startDate, endDate) {
        const url = `${this.attendance}/${ApiUrl.totalCountByUserId}?userId=${userId}&present=${present}&type=${model.type}&startDate=${startDate}&endDate=${endDate}`;
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

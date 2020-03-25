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
        const attendance = `${this.attendance}/${ApiUrl.list}`;
        return this.RequestService.getData(attendance);
    }

    /**
   * Get Detail of Attendence
   * It Returns the Object of Attendence Detail
   */
    getAttendencedDetail() {
        const attendance = `${this.attendance}/${ApiUrl.detail}`;
        return this.RequestService.getData(attendance);
    }

    /**
   * Get Attendence Detail By Id
   * @param id  Returns the Attendence Detail on specific Id
   */
    getAttendencedDetailById(id) {
        const attendance = `${this.attendance}/${ApiUrl.detail}`;
        return this.RequestService.getData(attendance + id);
    }

    /**
        * Add Data to Attendece
        * @param Obj is the object to be added 
        */
    addData(obj) {
        const attendance = `${this.attendance}/${ApiUrl.add}`;
        return this.RequestService.addData(attendance, obj)
    }

    /**
        *Get Data of Attendence By Id
        * @param id Returns the attendence list on Specific Id
        */
    getById(id) {
        const attendance = `${this.attendance}/${ApiUrl.list}/`;
        return this.RequestService.getData(attendance + id);
    }

    /**
        *Update Data of Attendence By Id
        * @param obj is the object to update the data
        */
    updateData(obj) {
        const attendance = `${this.attendance}/${ApiUrl.update}/`;
        return this.RequestService.updateData(attendance, obj);
    }

    /**
          *Delete Data of Attendence By Id
          * @param id is to delete attendence data 
          */
    deleteData(id) {
        const attendance = `${this.attendance}/${ApiUrl.delete}/`;
        return this.RequestService.deleteData(attendance, id);
    }

        /**
     * Return  role 
     * @param pageNumber is to get page based data 
     */
    getPagedAttendance(pageNumber) {
        const attendance = `${this.attendance}/${ApiUrl.getPagedAttendances}/${pageNumber}`;
        return this.RequestService.getData(attendance);
    }

    /**
          *Check In for Attendence By  Employee Id
          * @param id is to check in employee on the base  Id
          */
    checkIn(id) {
        const attendance = `${this.attendance}/${ApiUrl.checkIn}/`;
        return this.RequestService.deleteData(attendance, id);
    }

    /**
      *Check Out for Attendence By  Employee Id
      * @param id is to checkOut employee on the base  Id
      */
    checkOut(id) {
        const attendance = `${this.attendance}/${ApiUrl.checkOut}/`;
        return this.RequestService.deleteData(attendance, id);
    }

    /**
      *Start Break for Specific Employee 
      * @param id is to Start Break of employee on the base  Id
      */
    startBreak(id) {
        const attendance = `${this.attendance}/${ApiUrl.startBreak}/`;
        return this.RequestService.deleteData(attendance, id);
    }

    /**
        *End Break for Specific Employee 
        * @param id is to End Break of employee on the base  Id
        */
    endBreak(id) {
        const attendance = `${this.attendance}/${ApiUrl.endBreak}/`;
        return this.RequestService.deleteData(attendance, id);
    }
}

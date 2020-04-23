import { Injectable } from '@angular/core';
import { RequestService } from "./request.service";
import { ApiUrl } from 'src/shared/resource-references';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Injectable({
    providedIn: 'root'
})

export class LeaveService {

    constructor(private RequestService: RequestService, private storageService: LocalStorageService, ) { }

    leave = `${ApiUrl.leave}`;

    /**
   * Get Leave Data 
   * It Returns the Object 
   */
    getData() {
        const url = `${this.leave}/${ApiUrl.list}`;
        return this.RequestService.getData(url);
    }

    /**
     * Request  for Leave  
     * It requires the Object 
     */
    requestleave(leave) {
        const url = `${this.leave}/${ApiUrl.leaveRequest}`;
        return this.RequestService.addData(url, leave);
    }

    /**
     * Add Data to Leave
     * @param leave is the object to be added
     */
    addData(leave) {
        const url = `${this.leave}/${ApiUrl.add}`;
        return this.RequestService.addData(url, leave);
    }

    /**
   * Get Leave  By Id
   * @param id Returns the user by Id
   */
    getById(id) {
        const url = `${this.leave}/${ApiUrl.list}/`;
        return this.RequestService.getData(url + id);
    }

    /**
   * Update Leave 
   * @param leave it the object to update the data
   */
    updateData(leave) {
        const url = `${this.leave}/${ApiUrl.update}/${leave.id}`;
        return this.RequestService.updateData(url, leave);
    }

    /**
  * Delete leave by id  
  * @param id is to delete the user on base of id
  */
    deleteData(id) {
        const url = `${this.leave}/${ApiUrl.delete}`;
        return this.RequestService.deleteData(url, id);
    }

    /**
  * Return  role 
  * @param pageNumber is to get page based data 
  */
    getPagedleave(pageNumber) {
        const url = `${this.leave}/${ApiUrl.getPagedLeaves}/${pageNumber}`;
        return this.RequestService.getData(url);
    }


    getUserLeave(userId, pageNumber, leave: string, startDate:string) {
        const url = `${this.leave}/${ApiUrl.pagedUserLeaves}?userId=${userId}&pageNo=${pageNumber}&type=${leave}&startDate=${startDate}`;
        return this.RequestService.getData(url);
    }

    getUserLeaveCount(userId, status, model,startDate,endDate) {
        const url = `${this.leave}/${ApiUrl.totalCountByUserId}?userId=${userId}&status=${status}&type=${model.type}&startDate=${startDate}&endDate=${endDate}`;
        return this.RequestService.getData(url);
    }

    /**
     * Total number of leave
     * It will return the total leave 
     */
    getTotalLeave(model, type,startDate,endDate) {
        const url = `${this.leave}/${ApiUrl.totalCount}?status=${type}&type=${model.type}&startDate=${startDate}&endDate=${endDate}`;
        return this.RequestService.getData(url);
    }
}

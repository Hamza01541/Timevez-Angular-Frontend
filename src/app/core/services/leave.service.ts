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
        const leave = `${this.leave}/${ApiUrl.list}`;
        return this.RequestService.getData(leave);
    }

    /**
     * Request  for Leave  
     * It requires the Object 
     */
    requestleave(obj) {
        const leave = `${this.leave}/${ApiUrl.leaveRequest}`;
        return this.RequestService.addData(leave, obj);
    }

    /**
     * Add Data to Leave
     * @param obj is the object to be added
     */
    addData(obj) {
        const leave = `${this.leave}/${ApiUrl.add}`;
        return this.RequestService.addData(leave, obj);
    }

    /**
   * Get Leave  By Id
   * @param id Returns the user by Id
   */
    getById(id) {
        const leave = `${this.leave}/${ApiUrl.list}/`;
        return this.RequestService.getData(leave + id);
    }

    /**
   * Update Leave 
   * @param obj it the object to update the data
   */
    updateData(obj) {
        const leave = `${this.leave}/${ApiUrl.update}/${obj._id}`;
        return this.RequestService.updateData(leave, obj);
    }

    /**
  * Delete leave by id  
  * @param id is to delete the user on base of id
  */
    deleteData(id) {
        const leave = `${this.leave}/${ApiUrl.delete}`;
        return this.RequestService.deleteData(leave, id);
    }

    /**
  * Return  role 
  * @param pageNumber is to get page based data 
  */
    getPagedUsers(pageNumber) {
        const leave = `${this.leave}/${ApiUrl.getPagedUsers}/${pageNumber}`;
        return this.RequestService.getData(leave);
    }


    
    /**
     * Total number of leave
     * It will return the total leave 
     * 
     */
    getTotalLeave(model,type) {
        const url = `${this.leave}/${ApiUrl.totalCount}?status=${type}&type=${model.type}&startDate=${model.startDate}&endDate=${model.endDate}`;
        return this.RequestService.getData(url);
    }   


}

import { Injectable } from '@angular/core';
import { RequestService } from "./request.service";
import { ApiUrl } from 'src/shared/resource-references';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { Leave } from "src/app/models";

@Injectable({
    providedIn: 'root'
})

export class LeaveService {
    leave:string = `${ApiUrl.leave}`;

    constructor(private RequestService: RequestService, private storageService: LocalStorageService, ) { }

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
    requestleave(leave: Leave) {
        const url = `${this.leave}/${ApiUrl.leaveRequest}`;
        return this.RequestService.addData(url, leave);
    }

    /**
     * Add Data to Leave
     * @param leave is the object to be added
     */
    addData(leave: Leave) {
        const url = `${this.leave}/${ApiUrl.add}`;
        return this.RequestService.addData(url, leave);
    }

    /**
   * Get Leave  By Id
   * @param id Returns the user by Id
   */
    getById(id: string) {
        const url = `${this.leave}/${ApiUrl.list}/`;
        return this.RequestService.getData(url + id);
    }

    /**
   * Update Leave 
   * @param leave it the object to update the data
   */
    updateData(leave: Leave) {
        const url = `${this.leave}/${ApiUrl.update}/${leave._id}`;
        return this.RequestService.updateData(url, leave);
    }

    /**
  * Delete leave by id  
  * @param id is to delete the user on base of id
  */
    deleteData(id: string) {
        const url = `${this.leave}/${ApiUrl.delete}`;
        return this.RequestService.deleteData(url, id);
    }

    /**
  * Return  role 
  * @param pageNumber is to get page based data 
  */
    getPagedleave(pageNumber: number) {
        const url = `${this.leave}/${ApiUrl.getPagedLeaves}/${pageNumber}`;
        return this.RequestService.getData(url);
    }


    getUserLeave(userId: string, pageNumber: number, filterType: string, fromDate?: string, toDate?: string, search?:string, limit: number = 10) {
        const url = `${this.leave}/${ApiUrl.pagedUserLeaves}?userId=${userId}&pageNo=${pageNumber}&type=${filterType}&fromDate=${fromDate}&toDate=${toDate}&limit=${limit}&search=${search}`;
        return this.RequestService.getData(url);
    }

    getUserLeaveCount(userId: string, status: string, filterType: string, fromDate: string, toDate: string) {
        const url = `${this.leave}/${ApiUrl.totalCountByUserId}?userId=${userId}&status=${status}&type=${filterType}&fromDate=${fromDate}&toDate=${toDate}`;
        return this.RequestService.getData(url);
    }

    /**
     * Total number of leave
     * It will return the total leave 
     */
    getTotalLeave(filterType: string, status: string, fromDate: string, toDate: string) {
        const url = `${this.leave}/${ApiUrl.totalCount}?status=${status}&type=${filterType}&fromDate=${fromDate}&toDate=${toDate}`;
        return this.RequestService.getData(url);
    }
}

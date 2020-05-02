import { Injectable } from '@angular/core';
import { RequestService } from "./request.service";
import { ApiUrl } from 'src/app/shared/resource-references';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { User } from "src/app/models";

@Injectable({
    providedIn: 'root'
})

export class UserService {
    user: string = `${ApiUrl.user}`;

    constructor(private RequestService: RequestService, private storageService: LocalStorageService, ) { }

    /**
   * Get User Data 
   * It Returns the Object 
   */
    getData() {
        const url = `${this.user}/${ApiUrl.list}`;
        return this.RequestService.getData(url);
    }

    /**
     * Add Data to User
     * @param user is the object to be added
     */
    addData(user: User) {
        const url = `${this.user}/${ApiUrl.register}`;
        return this.RequestService.addData(url, user);
    }

    /**
    * User Can Login
    * @param user is the object to Login the User
    */
    userLogin(user: User) {
        const url = `${this.user}/${ApiUrl.login}`;
        return this.RequestService.addData(url, user);
    }

    /**
     * Get User  By Id
     * @param userId  User id
     */
    getById(userId: string) {
        const url = `${this.user}/${ApiUrl.list}/`;
        return this.RequestService.getData(url + userId);
    }

    /**
* Update User 
* @param user it the object to update the data
*/
    updateData(user: User) {
        const url = `${this.user}/${ApiUrl.update}/${user._id}`;
        return this.RequestService.updateData(url, user);
    }

    /**
* Update User 
* @param user it the object to update the data
*/
    changePassword(user: User) {
        const url = `${this.user}/${ApiUrl.changePassword}`;
        return this.RequestService.updateData(url, user);
    }

    /**
  * Delete User by id  
  * @param id is to delete the user on base of id
  */
    deleteData(id: string) {
        const url = `${this.user}/${ApiUrl.delete}`;
        return this.RequestService.deleteData(url, id);
    }

    /**
    * Filter user records.
    * @param pageNumber Current Page number
    * @param {string} search Entered text in search box to filter data.
    * @returns Filtered records
    */
    getPagedUsers(pageNumber: number, search?:string) {
        // const url = `${this.user}/${ApiUrl.getPagedUsers}/${pageNumber}`;
        const url = `${this.user}/${ApiUrl.getPagedUsers}?pageNo=${pageNumber}&search=${search}`;
        return this.RequestService.getData(url);
    }

    /**
     * Total number of users
     * It will return the total number of users
     */
    getTotalUsers(filterType: string, toDate?: string) {
        const url = `${this.user}/${ApiUrl.totalCount}?type=${filterType}&toDate=${toDate}`;
        return this.RequestService.getData(url);
    }

    // /**
    // * Filter user records.
    // * @param pageNumber Current Page number
    // * @param {string} search Entered text in search box to filter data.
    // * @returns Filtered records
    // */
    // searchUser(pageNumber: number, search: string) {
    //     const url = `${this.user}/${ApiUrl.getPagedUsers}?pageNo=${pageNumber}&search=${search}`;
    //     return this.RequestService.getData(url);
    // }

    /**
   * Logout The user 
   * It will remove the current user details from local storage
   */
    logout() {
        this.storageService.remove('currentUser');
    }
}

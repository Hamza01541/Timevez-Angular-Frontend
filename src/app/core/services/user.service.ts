import { Injectable } from '@angular/core';
import { RequestService } from "./request.service";
import { ApiUrl } from 'src/app/shared/resource-references';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { User } from "src/app/models";
import { UserStatusService } from './user-status.service';
import { Constants } from 'src/app/shared/constants';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    userBaseUrl: string = `${ApiUrl.user}`;

    constructor(private RequestService: RequestService, private storageService: LocalStorageService, private userStatusService: UserStatusService) { }

    /**
   * Get User Data 
   * It Returns the Object 
   */
    getData() {
        const url = `${this.userBaseUrl}/${ApiUrl.list}`;
        return this.RequestService.getData(url);
    }

    /**
     * Add Data to User
     * @param user is the object to be added
     */
    addData(user: User) {
        const url = `${this.userBaseUrl}/${ApiUrl.register}`;
        return this.RequestService.addData(url, user);
    }

    /**
    * User Can Login
    * @param user is the object to Login the User
    */
    userLogin(user: User) {
        const url = `${this.userBaseUrl}/${ApiUrl.login}`;
        return this.RequestService.addData(url, user);
    }

    /**
     * Get User  By Id
     * @param userId  User id
     */
    getById(userId: string) {
        const url = `${this.userBaseUrl}/${ApiUrl.list}/${userId}`;
        return this.RequestService.getData(url);
    }

 /**
  * Upload user photo
  * @param userId User Id
  * @param photo Photo(base64 format) to be uploaded.
  */
    uploadPhoto(userId:string, obj: any) {
        const url = `${this.userBaseUrl}${ApiUrl.uploadphoto}/${userId}`;
        return this.RequestService.updateData(url, obj);
    }

    /**
* Update User 
* @param user it the object to update the data
*/
    updateData(user: User) {
        const url = `${this.userBaseUrl}/${ApiUrl.update}/${user._id}`;
        return this.RequestService.updateData(url, user);
    }

    /**
* Update User 
* @param user it the object to update the data
*/
    changePassword(user: User) {
        const url = `${this.userBaseUrl}/${ApiUrl.changePassword}`;
        return this.RequestService.updateData(url, user);
    }

    /**
  * Delete User by id  
  * @param id is to delete the user on base of id
  */
    deleteData(id: string) {
        const url = `${this.userBaseUrl}/${ApiUrl.delete}`;
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
        const url = `${this.userBaseUrl}/${ApiUrl.getPagedUsers}?pageNo=${pageNumber}&search=${search}`;
        return this.RequestService.getData(url);
    }

    /**
     * Total number of users
     * It will return the total number of users
     */
    getTotalUsers(filterType: string, toDate?: string) {
        const url = `${this.userBaseUrl}/${ApiUrl.totalCount}?type=${filterType}&toDate=${toDate}`;
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
            this.storageService.remove(Constants.currentUser);
            this.userStatusService.isUserLoggedIn.next(false);
    }
}

import { Injectable } from '@angular/core';
import { RequestService } from "./request.service";
import { ApiUrl } from 'src/shared/resource-references';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Injectable({
    providedIn: 'root'
})

export class UserService {

    constructor(private RequestService: RequestService, private storageService: LocalStorageService, ) { }

    user = `${ApiUrl.user}`;

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
    addData(user) {
        const url = `${this.user}/${ApiUrl.register}`;
        return this.RequestService.addData(url, user);
    }

    /**
    * User Can Login
    * @param user is the object to Login the User
    */
    userLogin(user) {
        const url = `${this.user}/${ApiUrl.login}`;
        return this.RequestService.addData(url, user);
    }

    /**
   * Get User  By Id
   * @param id Returns the user by Id
   */
    getById(id) {
        const url = `${this.user}/${ApiUrl.list}/`;
        return this.RequestService.getData(url + id);
    }

    /**
* Update User 
* @param user it the object to update the data
*/
    updateData(user) {
        const url = `${this.user}/${ApiUrl.update}/${user._id}`;
        return this.RequestService.updateData(url, user);
    }

    /**
* Update User 
* @param user it the object to update the data
*/
    changePassword(user:any) {
        const url = `${this.user}/${ApiUrl.changePassword}`;
        return this.RequestService.updateData(url, user);
    }

    /**
  * Delete User by id  
  * @param id is to delete the user on base of id
  */
    deleteData(id) {
        const url = `${this.user}/${ApiUrl.delete}`;
        return this.RequestService.deleteData(url, id);
    }

    /**
  * Return  role 
  * @param pageNumber is to get page based data 
  */
    getPagedUsers(pageNumber) {
        const url = `${this.user}/${ApiUrl.getPagedUsers}/${pageNumber}`;
        return this.RequestService.getData(url);
    }

    /**
     * Total number of users
     * It will return the total number of users
     */
    getTotalUsers(model,startDate,endDate) {
        const url = `${this.user}/${ApiUrl.totalCount}?type=${model.type}&startDate=${startDate}&endDate=${endDate}`;
        return this.RequestService.getData(url);
    }

     /**
     * Return the User that matched the value
     * @param pageNo is the Numer of page
     * @param search is the search string that user will type
     */
    searchUser(pageNo, search) {
        const url = `${this.user}/${ApiUrl.getPagedUsers}?pageNo=${pageNo}&search=${search}`;
        return this.RequestService.getData(url);
    }

    /**
   * Logout The user 
   * It will remove the current user details from local storage
   */
    logOut() {
        this.storageService.remove('currentUser');
    }
}

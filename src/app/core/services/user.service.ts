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
        const user = `${this.user}/${ApiUrl.list}`;
        return this.RequestService.getData(user);
    }

    /**
     * Add Data to User
     * @param obj is the object to be added
     */
    addData(obj) {
        const user = `${this.user}/${ApiUrl.register}`;
        return this.RequestService.addData(user, obj);
    }

    /**
    * User Can Login
    * @param obj is the object to Login the User
    */
    userLogin(obj) {
        const user = `${this.user}/${ApiUrl.login}`;
        return this.RequestService.addData(user, obj);
    }

    /**
   * Get User  By Id
   * @param id Returns the user by Id
   */
    getById(id) {
        const user = `${this.user}/${ApiUrl.list}/`;
        return this.RequestService.getData(user + id);
    }

    /**
* Update User 
* @param obj it the object to update the data
*/
    updateData(obj) {
        const user = `${this.user}/${ApiUrl.update}/`;
        return this.RequestService.updateData(user, obj);
    }

    /**
  * Delete User by id  
  * @param id is to delete the user on base of id
  */
    deleteData(id) {
        const user = `${this.user}/${ApiUrl.delete}`;
        return this.RequestService.deleteData(user, id);
    }

    /**
  * Return  role 
  * @param pageNumber is to get page based data 
  */
    getPagedUsers(pageNumber) {
        const user = `${this.user}/${ApiUrl.getPagedUsers}/${pageNumber}`;
        return this.RequestService.getData(user);
    }

    /**
   * Logout The user 
   * It will remove the current user details from local storage
   */
    logOut() {
        this.storageService.remove('currentUser');
    }
}

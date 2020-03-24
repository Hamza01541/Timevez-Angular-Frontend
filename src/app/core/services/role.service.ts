import { Injectable } from '@angular/core';
import { RequestService } from "./request.service";
import { ApiUrl } from 'src/shared/resource-references';

@Injectable({
    providedIn: 'root'
})
export class RoleService {

    constructor(private RequestService: RequestService) { }

    role = `${ApiUrl.role}`;
    /**
   * Get Role Data 
   *  It Returns the Object 
   */
    getData() {
        const role = `${this.role}/${ApiUrl.list}`;
        return this.RequestService.getData(role);
    }

    /**
       * Add Data to role
       * @param obj is the object to be added
       */
    addData(obj) {
        const role = `${this.role}/${ApiUrl.add}`;
        return this.RequestService.addData(role, obj);
    }

    /**
   * Get Role  By Id
   * @param id is to get role on the base of Id
   */
    getById(id) {
        const role = `${this.role}/${ApiUrl.list}/`;
        return this.RequestService.getData(role + id);
    }

    /**
   * Update role
   * @param obj it the object to update the data
   */
    updateData(obj) {
        const role = `${this.role}/${ApiUrl.update}/`;
        return this.RequestService.updateData(role, obj);
    }

    /**
   * Delete role Detail By Id
   * @param id is to delete the role data on the base of Id
   */
    deleteData(id) {
        const role = `${this.role}/${ApiUrl.delete}/`;
        return this.RequestService.deleteData(role, id);
    }
}

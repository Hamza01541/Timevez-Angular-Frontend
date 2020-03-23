import { Injectable } from '@angular/core';
import { RequestService } from "./request.service";
import { ApiUrl } from 'src/shared/resource-references';

@Injectable({
    providedIn: 'root'
})
export class RoleService {

    constructor(private RequestService: RequestService) { }

    role = `${ApiUrl.role}`;
    getData() {
        const role = `${this.role}/${ApiUrl.list}`;
        return this.RequestService.getData(role).map((response: any) => {
            return response;
        });
    }

    addData(param) {
        const role = `${this.role}/${ApiUrl.add}`;
        return this.RequestService.addData(role, param).map((response: any) => {
            return response;
        });
    }

    getById(id) {
        const role = `${this.role}/${ApiUrl.list}/`;
        return this.RequestService.getData(role + id).map((response: any) => {
            return response;
        });
    }

    updateData(model) {
        const role = `${this.role}/${ApiUrl.update}/`;
        return this.RequestService.updateData(role, model).map((response: any) => {
            return response;
        });
    }

    deleteData(id) {
        const role = `${this.role}/${ApiUrl.delete}/`;
        return this.RequestService.deleteData(role, id).map((response: any) => {
            return response;
        });
    }
}

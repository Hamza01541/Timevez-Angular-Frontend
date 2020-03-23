import { Injectable } from '@angular/core';
import { RequestService } from "./request.service";
import { ApiUrl } from 'src/shared/resource-references';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private RequestService: RequestService) { }

    user = `${ApiUrl.user}`;
    getData() {
        const user = `${this.user}/${ApiUrl.list}`;
        return this.RequestService.getData(user).map((response: any) => {
            return response;
        });
    }

    addData(param) {
        const user = `${this.user}/${ApiUrl.register}`;
        return this.RequestService.addData(user, param).map((response: any) => {
            return response;
        });
    }

    userLogin(param) {
        const user = `${this.user}/${ApiUrl.login}`;
        return this.RequestService.addData(user, param).map((response: any) => {
            return response;
        });

    }

    getById(id) {
        const user = `${this.user}/${ApiUrl.list}/`;
        return this.RequestService.getData(user + id).map((response: any) => {
            return response;
        });
    }

    updateData(model) {
        const user = `${this.user}/${ApiUrl.update}/`;
        return this.RequestService.updateData(user, model).map((response: any) => {
            return response;
        });
    }

    deleteData(id) {
        const user = `${this.user}/${ApiUrl.delete}/`;
        return this.RequestService.deleteData(user, id).map((response: any) => {
            return response;
        });
    }

    // hardDelete(storeId: number) {
    //     const hardDelete = `${this.store}/${ApiUrl.hardDelete}`;
    //     return this.RequestService.deleteData(hardDelete, storeId).map((response: any) => {
    //         return response;
    //     });
    // }
}

import { Injectable } from '@angular/core';
import { RequestService } from "./request.service";
import { ApiUrl } from 'src/shared/resource-references';

@Injectable({
    providedIn: 'root'
})
export class AttendanceService {

    constructor(private RequestService: RequestService) { }

    attendance = `${ApiUrl.attendance}`;
    getData() {
        const attendance = `${this.attendance}/${ApiUrl.list}`;
        return this.RequestService.getData(attendance).map((response: any) => {
            return response;
        });
    }
    getAttendencedDetail() {
        const attendance = `${this.attendance}/${ApiUrl.detail}`;
        return this.RequestService.getData(attendance).map((response: any) => {
            return response;
        });
    }
    getAttendencedDetailById() {
        const attendance = `${this.attendance}/${ApiUrl.detail}`;
        return this.RequestService.getData(attendance).map((response: any) => {
            return response;
        });
    }

    addData(param) {
        const attendance = `${this.attendance}/${ApiUrl.add}`;
        return this.RequestService.addData(attendance, param).map((response: any) => {
            return response;
        });
    }

    getById(id) {
        const attendance = `${this.attendance}/${ApiUrl.list}/`;
        return this.RequestService.getData(attendance + id).map((response: any) => {
            return response;
        });
    }

    updateData(model) {
        const attendance = `${this.attendance}/${ApiUrl.update}/`;
        return this.RequestService.updateData(attendance, model).map((response: any) => {
            return response;
        });
    }

    deleteData(id) {
        const attendance = `${this.attendance}/${ApiUrl.delete}/`;
        return this.RequestService.deleteData(attendance, id).map((response: any) => {
            return response;
        });
    }
    
    checkIn(id) {
        const attendance = `${this.attendance}/${ApiUrl.checkIn}/`;
        return this.RequestService.deleteData(attendance, id).map((response: any) => {
            return response;
        });
    }
    
    checkOut(id) {
        const attendance = `${this.attendance}/${ApiUrl.checkOut}/`;
        return this.RequestService.deleteData(attendance, id).map((response: any) => {
            return response;
        });
    }
    startBreak(id){
        const attendance = `${this.attendance}/${ApiUrl.startBreak}/`;
        return this.RequestService.deleteData(attendance, id).map((response: any) => {
            return response;
        });
    }

    endBreak(id){
        const attendance = `${this.attendance}/${ApiUrl.endBreak}/`;
        return this.RequestService.deleteData(attendance, id).map((response: any) => {
            return response;
        });
    }
}

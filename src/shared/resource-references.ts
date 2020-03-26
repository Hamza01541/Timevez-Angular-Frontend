import { environment } from 'src/environments/environment';

/**
 * For API Requests
 */
export class ApiUrl {
    static url = `${environment.apiUrl}`;
    //Admin and Other Pages
    static user = `user`;
    static list = `list`;
    static login = `login`;
    static register = `register`;
    static update = `update`;
    static delete = `delete`;
    static role = `role`;
    static add = `add`;
    static attendance = `attendance`;
    static detail = `detail`;
    static checkIn = `checkIn`;
    static checkOut = `checkOut`;
    static startBreak = `startBreak`;
    static endBreak = `endBreak`;
    //Pagination
    static getPagedAttendances = `PagedAttendances`;
    static getPagedRoles = `PagedRoles`;
    static getPagedUsers = `PagedUsers`

}

/**
 * For Static JSON Assets
 */
export class StaticAsset {
    static assets = 'assets/';
    static translations = `${StaticAsset.assets}translations/`;
}
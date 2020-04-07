import { environment } from 'src/environments/environment';

/**
 * For API Requests
 */
export class ApiUrl {
    // Base URL
    static baseBackendUrl = `${environment.backend_uri}/${environment.api_version}`;
    // Admin and Other Pages
    static user = `user`;
    static list = `list`;
    static login = `login`;
    static register = `register`;
    static update = `update`;
    static delete = `delete`;
    static add = `add`;
    static attendance = `attendance`;
    static detail = `detail`;
    static checkIn = `checkIn`;
    static checkOut = `checkOut`;
    static startBreak = `startBreak`;
    static endBreak = `endBreak`;
    // Pagination
    static getPagedAttendances = `PagedAttendances`;
    static getPagedUsers = `PagedUsers`
    static getUserPageAttendance = `pagedUserAttendances`;
}

/**
 * For Static JSON Assets
 */
export class StaticAsset {
    static assets = 'assets/';
    static translations = `${StaticAsset.assets}translations/`;
}
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UtilityService {
    constructor() {

    }

    /**
* Get current date in format ("m/dd/yyyy")
*/
    getCurrentDate = (date) => {
        return date.toLocaleString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' });
    }

}
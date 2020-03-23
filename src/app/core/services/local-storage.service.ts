import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    /**
     * Set value to localstorage.
     * @param {String} key  
     * @param {any} value  
     */
    set(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    /**
     * Retrieve value from localstorage.
     * @param {string} key 
     * @returns {any}
     */
    get(key: string) {
        return JSON.parse(localStorage.getItem(key));
    }

    /**
     * Remove value from localstorage.
     * @param {string} key
     */
    remove(key: string) {
        localStorage.removeItem(key);
    }

    /**
     * Clear localstorage.
     */
    clear() {
        localStorage.clear();
    }
}
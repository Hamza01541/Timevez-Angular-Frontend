import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CryptoService {

    constructor() {}

    /**
     * Decrypt data
     * @param dataToConvert Data to be decrypted
     */
    decryptData(dataToConvert: any) {
        return JSON.parse(CryptoJS.AES.decrypt(dataToConvert, environment.crypto_secret_key.trim()).toString(CryptoJS.enc.Utf8));
    }

    /**
     * Encrypt data 
     * @param dataToConvert Data to be encrypted
     */
    encryptData(dataToConvert: any) {
        return CryptoJS.AES.encrypt(JSON.stringify(dataToConvert), environment.crypto_secret_key.trim()).toString();
    }


}
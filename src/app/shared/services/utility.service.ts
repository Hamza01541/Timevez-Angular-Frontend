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

      /**
   * Get validation classes.
   * @param el Current Element to be validate.
   * @param expectedLength Expected value length
   */
  getValidationClass(el: any, expectedLength:number = 0) {
    if (el.value && typeof el.value === 'string'){
     return {'is-valid': el.valid && el.value.trim().length >= expectedLength, 'is-invalid': (el.invalid || el.value.trim().length < expectedLength) && (el.dirty || el.touched)};
    } else {
      return {'is-valid': el.valid && el.value, 'is-invalid': el.invalid && (el.dirty || el.touched) && (!el.value)};
    }
  }

}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiUrl } from 'src/shared/resource-references';

@Injectable({
  providedIn: 'root'
})

export class RequestService {
  baseUrl = `${ApiUrl.url}`;

  constructor(private http: HttpClient) { }
  
   /**
   * Get Attendence Detail By Id
   * @param id
   */
    getData(url: string, obj: any = {}) {

      console.log("url",url);
      console.log("Obj",obj);
      url = `${this.baseUrl}${url}`;
      return this.http.get(url, obj);
    }

   /**
   * Get Attendence Detail By Id
   * @param id
   */
    addData(url: string, obj: any) {
      url = `${this.baseUrl}${url}`;
      return this.http.post(url, obj)
    }

   /**
   * Get Attendence Detail By Id
   * @param id
   */
    updateData(url: string, obj: any = {}) {
      url = `${this.baseUrl}${url}/${obj.id}`;
      return this.http.put(url, obj)
    }

   /**
   * Get Attendence Detail By Id
   * @param id
   */
    deleteData(url: string, id: any) {
      url = `${this.baseUrl}${url}/${id}`;
      return this.http.delete(url)
    }

}
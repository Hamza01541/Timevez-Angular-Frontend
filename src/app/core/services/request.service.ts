import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiUrl } from 'src/app/shared/resource-references';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  baseUrl = `${ApiUrl.baseBackendUrl}`;

  constructor(private http: HttpClient) { }

  /**
   *@param {string} url it is the endpoint of the API
   *@param {any} obj it is an optional param
   *@returns Observable<any> in response to an API endpoint
   */
  getData(url: string, obj?): Observable<any> {
    url = `${this.baseUrl}${url}`;
    return this.http.get(url, obj);
  }

  /**
   *@param {string} url it is the endpoint of the API
   *@param {any} obj is the object to be added
   *@returns Observable<any> in response
   */
  addData(url: string, obj?: any): Observable<any> {
    url = `${this.baseUrl}${url}`;
    return this.http.post(url, obj)
  }

  /**
   *@param {string} url it is the endpoint of the API
   *@param {any} obj is the new object to be updated
   *@returns Observable<any> in response
   */
  updateData(url: string, obj: any = {}): Observable<any> {
    url = `${this.baseUrl}${url}`;
    return this.http.put(url, obj)
  }

  /**
   *@param {string} url it is the endpoint of the API
   *@param {any} id is the id of object to be deleted
   *@returns Observable<any> in response
   */
  deleteData(url: string, id: any): Observable<any> {
    url = `${this.baseUrl}${url}/${id}`;
    return this.http.delete(url)
  }
}
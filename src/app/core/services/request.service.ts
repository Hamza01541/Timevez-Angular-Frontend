import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { ApiUrl } from 'src/shared/resource-references';

@Injectable({
  providedIn: 'root'
})

export class RequestService {
  baseUrl = `${ApiUrl.url}`;

  constructor(private http: HttpClient) { }

    getData(url: string, obj: any = {}) {
      url = `${this.baseUrl}${url}`;
      return this.http.get(url, obj).map((response: any) => {
        console.log("#GetData-response: request", response);
        return response;
      });
    }

    addData(url: string, obj: any) {
      url = `${this.baseUrl}${url}`;
      return this.http.post(url, obj).map((response: any) => {
        console.log("#AddData-response:", response);
        return response;
      });
    }

    updateData(url: string, obj: any = {}) {
      url = `${this.baseUrl}${url}/${obj.id}`;
      return this.http.put(url, obj).map((response: any) => {
        console.log("#UpdateData-response:", response);
        return response;
      });
    }

    deleteData(url: string, id: any) {
      url = `${this.baseUrl}${url}/${id}`;
      return this.http.delete(url).map((response: any) => {
        console.log("#DeleteData-response:", response);
        return response;
      });
    }

    testAPI(address) {
      let url = `https://nominatim.openstreetmap.org/search/${address}?format=json&addressdetails=1`;
      return this.http.get(url).map((response: any) => {
        return response;
      });
    }
}
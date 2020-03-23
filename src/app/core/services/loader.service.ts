import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
declare var jQuery: any;

export interface LoaderState {
  show: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loaderSubject = new Subject<LoaderState>();

  constructor() {
  }

  show() {
    jQuery('body').addClass("disable-scroll");
    this.loaderSubject.next(<LoaderState>{ show: true });
  }

  hide() {
    jQuery('body').removeClass("disable-scroll");
    this.loaderSubject.next(<LoaderState>{ show: false });
  }

  getLoaderState(): Observable<LoaderState> {
    return this.loaderSubject.asObservable();
  }
}

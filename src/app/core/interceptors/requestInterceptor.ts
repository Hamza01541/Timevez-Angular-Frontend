import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as Sentry from "@sentry/browser";

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    blacklistHeaderUrls: string[] = ['api.ipify.org'];
    sentryBlackListUrls: any[] = [];

    constructor(private router: Router) { }

    /**
     * Request/Error Interceptor.
     * Check request urls and set headers and token, if required.
     * Catch backend errors, log them in sentry.
     * On 401 error, logout user and rediect to login page.
     * @param request 
     * @param next 
     * @returns {Observable<HttpEvent<any>>}
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // request = this.checkUrl(request);
        request = this.setRequestHeader(request);

        return next.handle(request).pipe(map((response: HttpEvent<any>) => {
            return response;
        }),
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    setTimeout(() => {
                        this.router.navigate(['login'], { queryParams: { logout: true } });
                    }, 100);
                } else {
                    // this.logSentryError(request, error);
                }
                return throwError(error);
            })
        );
    }

    /**
     * Checks either current request error is in sentry black listed errors,
     * if not, then log error in sentry.
     * @param {HttpErrorResponse} error request error to be logged in sentry.
     * @returns {void}
     */
    logSentryError(request: HttpRequest<any>, error: HttpErrorResponse): void {
        let isBlackListUrl = false;

        for (let i = 0; i < this.sentryBlackListUrls.length; i++) {
            if (request.url.includes(this.sentryBlackListUrls[i])) {
                isBlackListUrl = true;
                break;
            }
        }

        if (!isBlackListUrl) {
            const eventId = Sentry.captureException(error);
            Sentry.showReportDialog({ eventId });
        }
    }

    /**
     * Checks either url required header or not.
     * If current url is blacklist Header url returns request as it is,
     * otherwise set Header in request. 
     * @param request 
     * @returns request.
     */
    checkUrl(request: HttpRequest<any>) {
        if (!this.blacklistHeaderUrls.includes(request.url)) {
            request = this.setRequestHeader(request);
        }
        return request;
    }

    /**
     * Checks current user and set token in header
     * @param request 
     * @returns request header
     */
    setRequestHeader(request: HttpRequest<any>) {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + currentUser.token) });
        }
        return request;
    }
}
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { settings } from 'src/app/Core/settings/systemSettings';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  baseUrl: string = settings.baseUrl;

  constructor(public toastController: ToastController) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let token = localStorage.getItem('token');

    if (token) {
      request = request.clone({
        setHeaders: {
          'Authorization': 'bearer ' + token,
          'content-type': 'application/x-www-form-urlencoded'
        },
        url:`${this.baseUrl}${request.url}`
      });
      // console.log("State: 01" + JSON.stringify(request));
    }

    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        setHeaders: {
          'content-type': 'application/x-www-form-urlencoded'
        }
      });
      // console.log("State: 02" + JSON.stringify(request));
    }

    request = request.clone({
      headers: request.headers.set('Accept', 'application/json')
    });

    // console.log("State: 03" + request);

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // console.log('event--->>>', event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        // if (error.status === 401) {
        //  Do Something
        // }
        // return throwError(error);
        if (error instanceof HttpErrorResponse) {
          // Server Side Error
          // console.log(error);
          return throwError(error);
        } else {
          // Client Side Error
          return throwError(error);
        }
      }));
  }
}
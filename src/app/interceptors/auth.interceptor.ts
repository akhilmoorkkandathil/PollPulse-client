import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    const accessToken: string | null = localStorage.getItem('accessToken');
    const refreshToken: string | null = localStorage.getItem('refreshToken');


    if (accessToken && refreshToken) {
      request = request.clone({
        setHeaders: {
            Authorization: `Bearer ${accessToken}`,
            'X-Refresh-Token': refreshToken
        }
      });
    }

    return next.handle(request);
  }
}
import { HttpEvent, HttpInterceptorFn, HttpHandlerFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

export const ErrorInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  return next(req).pipe(
    tap({
      next: (event) => {
        // Handle successful response (optional)
        if (event instanceof HttpResponse) {
          // You can check status codes here if needed
        }
      },
      error: (error) => {
        // Check if the error response has a status code
        if (error.status === 401 || error.status === 403) {
          // Redirect to the login page
          const router = inject(Router);
          router.navigate(['/login']); // Adjust the path as needed
        }
        // You can handle other status codes as well (e.g., 404, 500)
      },
    })
  );
};

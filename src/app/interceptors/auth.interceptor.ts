import { HttpEvent, HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { Observable } from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const accessToken: string | null = localStorage.getItem('accessToken');
  const refreshToken: string | null = localStorage.getItem('refreshToken');

  if (accessToken) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
        'X-Refresh-Token': refreshToken ? refreshToken : ''
      }
    });
  }

  return next(req); // Call the next handler
};

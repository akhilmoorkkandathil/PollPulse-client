import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    provideAnimations(),
    provideHttpClient(
      withInterceptors([AuthInterceptor,ErrorInterceptor]) // Register the interceptor here
    )
  ],
};

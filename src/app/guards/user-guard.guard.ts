import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const userGuardGuard: CanActivateFn = (route, state) => {
  const userData = localStorage.getItem('accessToken')
  const router = inject(Router);

  if (userData) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};

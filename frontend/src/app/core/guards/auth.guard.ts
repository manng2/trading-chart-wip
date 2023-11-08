import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/data-access/auth.service';

export const authGuard: (isAnonymous: boolean) => CanActivateFn = (
  isAnonymous: boolean,
) => {
  return () => {
    const router = inject(Router);
    const authService = inject(AuthService);
    const user = JSON.parse(localStorage.getItem('user')!);

    if (isAnonymous) {
      if (!user) {
        return true;
      }
      authService.user.set(user);
      return router.createUrlTree(['/']);
    } else {
      if (user) {
        authService.user.set(user);
        return true;
      }

      return router.createUrlTree(['/login']);
    }
  };
};

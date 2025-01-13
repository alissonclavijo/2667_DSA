import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';

export const authGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const router = inject(Router);
    const authService = inject(AuthService);
    const isLoggedIn = authService.isLoggedIn();

    if (!isLoggedIn) {
        router.navigate(['/auth/login'], {
            queryParams: {
                returnUrl: state.url,
            },
        });
    }

    return isLoggedIn;
};

export const loggedInGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const router = inject(Router);
    const authService = inject(AuthService);
    const isLoggedIn = authService.isLoggedIn();

    if (isLoggedIn) {
        router.navigate(['/']);
    }

    return !isLoggedIn;
}

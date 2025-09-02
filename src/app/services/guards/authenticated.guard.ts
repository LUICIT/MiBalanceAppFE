import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authenticatedGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);

    try {
        // encrypts.decryptLocalStorage(environment.auth);
        return true;
    } catch {
        localStorage.clear();
        router.navigate(['login']);
        return false;
    }

};

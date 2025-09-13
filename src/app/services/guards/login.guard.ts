import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";
import { UserModel } from "@models/user.model";

export const loginGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);

    try {
        const userStr = JSON.parse(localStorage.getItem('currentUser')) as UserModel;
        if (userStr) {
            router.navigate(['home']);
            return false;
        }
        return true;
    } catch {
        localStorage.clear();
        return true;
    }

};

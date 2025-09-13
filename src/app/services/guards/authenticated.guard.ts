import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { UserModel } from "@models/user.model";

export const authenticatedGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);

    try {
        const userStr = JSON.parse(localStorage.getItem('currentUser')) as UserModel;
        if (!userStr) {
            localStorage.clear();
            router.navigate(['login']);
            return false;
        }
        return true;
    } catch {
        localStorage.clear();
        router.navigate(['login']);
        return false;
    }

};

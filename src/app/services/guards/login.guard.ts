import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {UserService} from "@services/system/user.service";

export const loginGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const userService = inject(UserService);

    try {
        if (userService.getUser()) {
            router.navigate(['home']);
            return false;
        }
        return true;
    } catch {
        localStorage.clear();
        return true;
    }

};

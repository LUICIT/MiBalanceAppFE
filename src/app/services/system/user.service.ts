import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserModel } from '@models/user.model';
import { TokenModel } from "@models/token.model";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    user = new BehaviorSubject<UserModel | null>(null);

    constructor() {
        try {
            const userStr = JSON.parse(localStorage.getItem('currentUser')) as UserModel;
            this.user.next(userStr);
        } catch {
            this.user.next(null);
        }
    }

    saveToken(tokenModel: TokenModel | null): void {
        if (tokenModel) {
            localStorage.setItem('tokenUser', JSON.stringify(tokenModel));
        }
    }

    saveUser(user: UserModel | null): boolean {
        if (user) {
            this.user.next(user);
            localStorage.setItem('currentUser', JSON.stringify(user));
            return true;
        }
        return false;
    }

    clearUser(): void {
        this.user.next(null);
        localStorage.removeItem('currentUser');
    }
}

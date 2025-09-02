import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserModel } from '@models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    user = new BehaviorSubject<UserModel | null>(null);

    constructor() {
        const storedUser = this.getUser();
        if (storedUser) {
            this.user.next(storedUser);
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

    getUser(): UserModel | null {
        const userStr = localStorage.getItem('currentUser');
        if (userStr) {
            try {
                return JSON.parse(userStr) as UserModel;
            } catch {
                return null;
            }
        }
        return null;
    }

    clearUser(): void {
        this.user.next(null);
        localStorage.removeItem('currentUser');
    }
}

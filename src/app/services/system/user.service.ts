import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserModel } from '@models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user = new BehaviorSubject<UserModel>(null);

  constructor() { }

  /*saveUser(user: UserModel): any {
    try {
      if (!user.MimeTypeImageProfile) {
        user.MimeTypeImageProfile = this.crypto.decryptLocalStorage(environment.user).MimeTypeImageProfile;
      }
      this.crypto.encryptLocalStorage(environment.user, user);
    } catch (e) {
      return null;
    }
    this.user.next(user);
  }*/

}

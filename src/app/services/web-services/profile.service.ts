import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ResponseModel } from "@models/response.model";
import { UserModel } from "@models/user.model";

@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    apiRest = `${ environment.baseUrl }v1/settings/`;

    constructor(
        private readonly httpClient: HttpClient
    ) {
    }

    profile(): Observable<ResponseModel<UserModel>> {
        return this.httpClient.get<ResponseModel<UserModel>>(
            this.apiRest + 'profile'
        );
    }

    update(userModel: UserModel): Observable<ResponseModel<UserModel>> {
        return this.httpClient.put<ResponseModel<UserModel>>(
            this.apiRest + 'profile',
            userModel
        );
    }

}

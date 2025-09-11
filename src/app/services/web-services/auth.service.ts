import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '@models/response.model';
import { CredentialModel } from '@models/credential.model';
import { environment } from '../../../environments/environment';
import { RegisterModel } from '@models/register.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    apiRest = `${environment.baseUrl}v1/auth/`;

    constructor(
        private readonly httpClient: HttpClient
    ) {
    }

    login(model: CredentialModel): Observable<ResponseModel> {
        return this.httpClient.post<ResponseModel>(
            this.apiRest + 'login',
            model
        );
    }

    register(model: RegisterModel): Observable<ResponseModel> {
        return this.httpClient.post<ResponseModel>(
            this.apiRest + 'register',
            model
        );
    }

    sendVerify(): Observable<ResponseModel<string>> {
        return this.httpClient.post<ResponseModel<string>>(
            this.apiRest + 'email/verification-notification',
            null
        );
    }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '@models/response.model';
import { CredentialModel } from '@models/credential.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    apiRest = 'http://localhost:8000/api/v1/auth/';

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

}

import { HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from "@models/user.model";
import { TokenModel } from "@models/token.model";

export const requestInterceptor: HttpInterceptorFn = (req, next): Observable<HttpEvent<unknown>> => {

    const tokenModel: TokenModel = JSON.parse(localStorage.getItem('tokenUser')) as TokenModel;

    const setHeaders: Record<string, string> = {
        'Accept': 'application/json'
    };

    if (tokenModel) {
        setHeaders['Authorization'] = `${ tokenModel.token_type } ${ tokenModel.access_token }`;
    }

    const cloned = req.clone({setHeaders});
    return next(cloned);
};

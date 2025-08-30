import { UserModel } from './user.model';
import { ErrorsType } from '../types/errors.type';

export class ResponseModel<T = unknown> {
    ok: boolean;
    code: string;
    status_code: number;
    message: string;
    request_id: string;
    timestamp: Date;

    /// Status OK
    data?: T;

    /// Status ERROR
    errors?: ErrorsType[];
    trace?: any

    /// Login
    access_token?: string;
    token_type?: string;
    user?: UserModel;
}

import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment";
import { UserService } from "@services/system/user.service";

@Injectable({
    providedIn: 'root'
})
export class Errors {

    private readonly errorConnection = 'Ocurrio un error interno en el servidor, intente más tarde';
    private readonly errorLoading = 'Error al cargar datos';

    constructor(
        private readonly userService: UserService,
        // private readonly location: Location,
        private readonly router: Router,
    ) {
    }

    handleError(error) {
        if (!environment.production) console.log(error);
        if (error.error instanceof ProgressEvent) {
            return this.errorConnection;
        } else {
            try {
                if (error.status) {
                    switch (error.status) {
                        case 401:
                            console.log('401');
                            this.exit();
                            return error.error.message;
                        case 400:
                        case 422:
                            if (error.error.errors) {
                                let errors = [];
                                for (const key in error.error.errors) {
                                    if (error.error.errors.hasOwnProperty(key)) {
                                        errors = error.error.errors[key];
                                    }
                                }
                                return errors[0];
                            }
                            return error.error.message;
                        default:
                            return this.errorLoading;
                    }
                } else return this.errorConnection;
            } catch (e) {
                return this.errorConnection;
            }
        }
    }

    exit(): void {
        this.userService.clearUser();
        this.router.navigate(['login']).then(r => r);
    }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LayoutAlignDirective, LayoutDirective } from '@ngbracket/ngx-layout';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { lastValueFrom } from 'rxjs';
import { AuthService } from '@services/web-services/auth.service';
import { CredentialModel } from '@models/credential.model';
import { validateAllFormFields } from 'ngx-helpers';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '@services/system/user.service';
import { MaterialModule } from '../../../modules/material.module';

@Component({
    selector: 'app-login',
    imports: [
        ReactiveFormsModule,
        RouterModule,
        MaterialModule,
        LayoutAlignDirective,
        LayoutDirective,
        TranslatePipe
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    hide = true;

    constructor(
        private readonly translateService: TranslateService,
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly formBuilder: FormBuilder,
        private readonly snackBar: MatSnackBar,
        private readonly router: Router
    ) {
    }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            email: ['falcon_nike3@hotmail.com', Validators.compose(
                [Validators.required, Validators.email]
            )],
            password: ['Luicit12', Validators.compose(
                [Validators.required, Validators.minLength(8)]
            )],
            rememberMe: false
        });
    }

    onLoginFormSubmit(): void {
        if (this.loginForm.invalid) {
            validateAllFormFields(this.loginForm);
            return;
        }
        const formValue = this.loginForm.value;
        const credentials: CredentialModel = {
            email: formValue.email,
            password: formValue.password,
            rememberMe: formValue.rememberMe
        }
        lastValueFrom(this.authService.login(credentials)).then(response => {
            if (this.userService.saveUser(response.user)) {
                this.router.navigate(['dashboard']);
                return;
            }
            this.snackBar.open('Error al guardar usuario, intente de nuevo', '×', {
                panelClass: 'error',
                verticalPosition: 'bottom',
                duration: 3000
            });
        }).catch(error => {
            this.snackBar.open(error.error.message, '×', {
                panelClass: 'error',
                verticalPosition: 'bottom',
                duration: 5000
            });
        });
    }

    changeLang(lang: string): void {
        this.translateService.use(lang);
    }

}

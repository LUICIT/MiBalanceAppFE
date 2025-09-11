import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import {FlexDirective, LayoutAlignDirective, LayoutDirective} from '@ngbracket/ngx-layout';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { matchPassword, validateAllFormFields, validateAlphabetic, validateEmail } from 'ngx-helpers';
import { RegisterModel } from '@models/register.model';
import { lastValueFrom } from 'rxjs';
import { AuthService } from '@services/web-services/auth.service';
import { MaterialModule } from '../../../modules/material.module';

@Component({
    selector: 'app-register',
    imports: [
        RouterModule,
        ReactiveFormsModule,
        MaterialModule,
        LayoutAlignDirective,
        LayoutDirective,
        FlexDirective,
        TranslatePipe
    ],
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup;

    disableButton = false;
    hide = true;

    constructor(
        private readonly translateService: TranslateService,
        private readonly authService: AuthService,
        private readonly formBuilder: FormBuilder,
        private readonly snackBar: MatSnackBar,
        private readonly router: Router,
    ) {
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            names: [null, Validators.compose([
                Validators.required,
                Validators.maxLength(100),
                validateAlphabetic
            ])],
            fatherSurname: [null, Validators.compose([
                Validators.required,
                Validators.maxLength(50),
                validateAlphabetic
            ])],
            motherSurname: [null, [
                Validators.maxLength(50),
                validateAlphabetic
            ]],
            birthday: [null, Validators.required],
            email: [null, Validators.compose([
                Validators.required,
                validateEmail
            ])],
            password: [null, Validators.compose([
                Validators.required,
                Validators.minLength(8),
            ])],
            password_confirmation: [null]
        }, {
            validators: matchPassword
        });
    }

    onRegisterFormSubmit(): void {
        if (this.registerForm.invalid) {
            validateAllFormFields(this.registerForm);
            return;
        }
        this.disableButton = true;
        const formValue = this.registerForm.value;
        const registerModel: RegisterModel = {
            names: formValue.names,
            father_surname: formValue.fatherSurname,
            mother_surname: formValue.motherSurname,
            birthday: formValue.birthday,
            email: formValue.email,
            password: formValue.password,
            password_confirmation: formValue.password_confirmation
        }

        lastValueFrom(this.authService.register(registerModel)).then(response => {
            if (<string>response.data) {
                this.router.navigate(['login']).then(r => r);
                this.snackBar.open(<string>response.data, '×', {
                    panelClass: 'error',
                    verticalPosition: 'bottom',
                    duration: 5000
                });
                this.disableButton = false;
            }
        }).catch(error => {
            this.disableButton = false;
            if (error.error.errors) {
                const firstKey = Object.keys(error.error.errors)[0];
                this.snackBar.open(error.error.errors[firstKey][0], '×', {
                    panelClass: 'error',
                    verticalPosition: 'bottom',
                    duration: 5000
                });
                return;
            }
            this.snackBar.open(error.error.message, '×', {
                panelClass: 'error',
                verticalPosition: 'bottom',
                duration: 5000
            });
        });
    }

    changeLang(lang: string) {
        this.translateService.use(lang);
    }

}


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InputFileModule } from '../../../theme/components/input-file/input-file.module';
import { ClassDirective, FlexDirective, LayoutDirective, ShowHideDirective } from '@ngbracket/ngx-layout';
import { MaterialModule } from "../../../modules/material.module";
import { matchPassword, validateAllFormFields, validateAlphabetic, validateEmail } from "ngx-helpers";
import { TranslatePipe } from "@ngx-translate/core";
import { UserService } from "@services/system/user.service";
import { UserModel } from "@models/user.model";
import { ProfileService } from "@services/web-services/profile.service";
import { lastValueFrom } from "rxjs";
import { Errors } from "@helpers/errors/errors";
import { AuthService } from "@services/web-services/auth.service";

@Component({
    selector: 'app-profile',
    imports: [
        ClassDirective,
        ReactiveFormsModule,
        InputFileModule,
        MaterialModule,
        LayoutDirective,
        FlexDirective,
        TranslatePipe,
        ShowHideDirective,
    ],
    templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

    passwordForm: FormGroup;
    infoForm: FormGroup;
    user: UserModel;

    mustVerifyEmail = false;
    hideCurrentPass = true;
    hideNewPass = true;

    constructor(
        private readonly profileService: ProfileService,
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly formBuilder: FormBuilder,
        private readonly snackBar: MatSnackBar,
        private readonly errors: Errors,
    ) {
    }

    ngOnInit(): void {
        this.infoForm = this.formBuilder.group({
            id: [null, Validators.required],
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
            image: [null]
        });
        this.passwordForm = this.formBuilder.group({
            currentPassword: ['', Validators.required],
            password: [null, Validators.compose([
                Validators.required,
                Validators.minLength(8),
            ])],
            password_confirmation: [null]
        }, {
            validators: matchPassword
        });
        this.loadProfile();
        this.userService.user.subscribe(user => {
            this.user = user;
            this.completeForm();
        });
    }

    loadProfile(): void {
        lastValueFrom(this.profileService.profile()).then(response => {
            this.user = response.data;
            this.userService.saveUser(this.user);
            this.completeForm();
        }).catch(error => {
            this.snackBar.open(this.errors.handleError(error), '×',
                {panelClass: 'error', verticalPosition: 'bottom', duration: 3000});
            const errors = error.error.error;
            this.mustVerifyEmail = errors?.mustVerifyEmail;
            if (this.mustVerifyEmail) {
                this.infoForm.get('email').disable();
            }
        });
    }

    onInfoFormSubmit(): void {
        if (this.infoForm.invalid) {
            validateAllFormFields(this.infoForm);
            return;
        }
        const formValue = this.infoForm.getRawValue();
        const user: UserModel = {
            id: formValue.id,
            names: formValue.names,
            father_surname: formValue.fatherSurname,
            mother_surname: formValue.motherSurname,
            birthday: formValue.birthday,
            email: formValue.email,
            avatar_path: formValue.image?.[0].file,
        }
        const formData = new FormData();
        Object.entries(user).forEach(([k, v]) => {
            if (v != null) formData.append(k, v);
        });
        lastValueFrom(this.profileService.update(formData)).then(response => {
            this.userService.saveUser(response.data);
            this.loadProfile();

            this.snackBar.open('Your account information updated successfully!', '×',
                {panelClass: 'success', verticalPosition: 'bottom', duration: 3000});
        }).catch(error => {
            this.snackBar.open(this.errors.handleError(error), '×',
                {panelClass: 'error', verticalPosition: 'bottom', duration: 3000});
        });
    }

    onSendVerifyEmail(): void {
        lastValueFrom(this.authService.sendVerify()).then(response => {
            this.snackBar.open(response.data, '×',
                {panelClass: 'success', verticalPosition: 'bottom', duration: 5000});
        }).catch(error => {})
    }

    onPasswordFormSubmit(): void {
        if (this.passwordForm.invalid) {
            validateAllFormFields(this.passwordForm);
            return;
        }
        const formValue = this.passwordForm.value;
        console.log(formValue)
        this.snackBar.open('Your password changed successfully!', '×',
            {panelClass: 'success', verticalPosition: 'top', duration: 3000});
    }

    private completeForm(): void {
        this.infoForm.patchValue({
            id: this.user.id,
            names: this.user.names,
            fatherSurname: this.user.father_surname,
            motherSurname: this.user.mother_surname,
            birthday: this.user.birthday,
            email: this.user.email
        });
    }

}

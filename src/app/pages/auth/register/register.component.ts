import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule, LayoutAlignDirective } from '@ngbracket/ngx-layout';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TranslatePipe } from '@ngx-translate/core';
import { matchPassword, validateAlphabetic, validateEmail } from 'ngx-helpers';

@Component({
    selector: 'app-register',
    imports: [
        RouterModule,
        ReactiveFormsModule,
        MatCardModule,
        MatInputModule,
        MatSelectModule,
        MatIconModule,
        MatButtonModule,
        MatSlideToggleModule,
        FlexLayoutModule,
        MatSnackBarModule,
        TranslatePipe,
        LayoutAlignDirective
    ],
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

    public registerForm: FormGroup;
    public hide = true;

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly router: Router,
        private readonly snackBar: MatSnackBar
    ) {
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            names: ['Luis Rodrigo', Validators.compose([
                Validators.required,
                Validators.maxLength(100),
                validateAlphabetic
            ])],
            fatherSurname: ['Aguilar', Validators.compose([
                Validators.required,
                Validators.maxLength(50),
                validateAlphabetic
            ])],
            motherSurname: ['Uribe', [
                Validators.maxLength(50),
                validateAlphabetic
            ]],
            birthday: ['1991-01-05', Validators.required],
            email: ['falcon_nike@hotmail.com', Validators.compose([
                Validators.required,
                validateEmail
            ])],
            password: ['Luicit03', Validators.compose([
                Validators.required,
                Validators.minLength(8),
            ])],
            password_confirmation: ['Luicit03']
        }, {
            validators: matchPassword
        });
    }

    public onRegisterFormSubmit(): void {
        if (this.registerForm.valid) {
            console.log(this.registerForm.value);
            this.snackBar.open('You registered successfully!', '×', {
                panelClass: 'success',
                verticalPosition: 'bottom',
                duration: 3000
            });
        }
    }
}


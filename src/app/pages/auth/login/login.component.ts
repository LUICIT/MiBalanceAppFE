import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { TranslatePipe } from '@ngx-translate/core';
import { lastValueFrom } from 'rxjs';
import { AuthService } from '@services/web-services/auth.service';
import { CredentialModel } from '@models/credential.model';

@Component({
    selector: 'app-login',
    imports: [
        ReactiveFormsModule,
        RouterModule,
        MatCardModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatSlideToggleModule,
        MatTooltipModule,
        FlexLayoutModule,
        TranslatePipe
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    hide = true;

    constructor(
        private readonly authService: AuthService,
        private readonly formBuilder: FormBuilder,
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
            console.log('Formulario no valido...');
            return;
        }
        const formValue = this.loginForm.value;
        const credentials: CredentialModel = {
            email: formValue.email,
            password: formValue.password,
            rememberMe: formValue.rememberMe
        }
        lastValueFrom(this.authService.login(credentials)).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error.error);
        });
    }

}

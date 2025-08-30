import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';

@Component({
    selector: 'app-auth',
    imports: [
        RouterModule,
        FlexLayoutModule,
    ],
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.scss'
})
export class AuthComponent {
}

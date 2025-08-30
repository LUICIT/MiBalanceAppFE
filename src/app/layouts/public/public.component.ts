import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';

@Component({
    selector: 'app-public',
    imports: [
        RouterModule,
        FlexLayoutModule,
    ],
    templateUrl: './public.component.html',
    styleUrl: './public.component.scss'
})
export class PublicComponent {
}

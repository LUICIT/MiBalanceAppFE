import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ClassDirective, LayoutAlignDirective, LayoutDirective } from '@ngbracket/ngx-layout';

@Component({
    selector: 'app-footer',
    imports: [
        MatButtonModule,
        LayoutAlignDirective,
        LayoutDirective,
        ClassDirective
    ],
    templateUrl: './footer.component.html'
})
export class FooterComponent {

    constructor() {
    }

}

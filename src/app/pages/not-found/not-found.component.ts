import { AfterViewInit, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { DomHandlerService } from '@services/theme/dom-handler.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'app-not-found',
    imports: [
        RouterModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        FlexLayoutModule,
        TranslatePipe
    ],
    templateUrl: './not-found.component.html',
    styleUrl: './not-found.component.scss'
})
export class NotFoundComponent implements AfterViewInit {

    constructor(
        private readonly router: Router,
        private readonly domHandlerService: DomHandlerService
    ) {
    }

    ngAfterViewInit(): void {
        this.domHandlerService.hidePreloader();
    }

    goHome(): void {
        this.router.navigate(['/']);
    }

}

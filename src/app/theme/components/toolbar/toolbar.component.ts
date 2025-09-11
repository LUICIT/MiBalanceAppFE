import { Component, EventEmitter, Output } from '@angular/core';
import { LangComponent } from '../lang/lang.component';
import { UserMenuComponent } from '../user-menu/user-menu.component';
import { LogoComponent } from '../logo/logo.component';
import { HorizontalMenuComponent } from '../menu/horizontal-menu/horizontal-menu.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { LayoutAlignDirective, LayoutDirective, ShowHideDirective } from '@ngbracket/ngx-layout';
import { MaterialModule } from '../../../modules/material.module';

@Component({
    selector: 'app-toolbar',
    imports: [
        RouterModule,
        LayoutDirective,
        LayoutAlignDirective,
        ShowHideDirective,
        MaterialModule,
        TranslateModule,
        LangComponent,
        UserMenuComponent,
        LogoComponent,
        HorizontalMenuComponent,
    ],
    templateUrl: './toolbar.component.html'
})
export class ToolbarComponent {

    @Output() onMenuIconClick: EventEmitter<any> = new EventEmitter<any>();

    sidenavToggle() {
        this.onMenuIconClick.emit();
    }
}

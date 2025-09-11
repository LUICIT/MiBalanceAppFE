import { Component } from '@angular/core';
import { LayoutAlignDirective, LayoutDirective, ShowHideDirective } from '@ngbracket/ngx-layout';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { BidiModule } from '@angular/cdk/bidi';
import { Settings, SettingsService } from '@services/theme/settings.service';
import { MaterialModule } from "../../../modules/material.module";

@Component({
    selector: 'app-user-menu',
    imports: [
        RouterModule,
        LayoutAlignDirective,
        LayoutDirective,
        ShowHideDirective,
        MaterialModule,
        TranslateModule,
        BidiModule,
    ],
    templateUrl: './user-menu.component.html'
})
export class UserMenuComponent {

    public settings: Settings;

    constructor(
        public settingsService: SettingsService
    ) {
        this.settings = this.settingsService.settings;
    }

}

import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgProgressbar } from 'ngx-progressbar';
import { NgProgressHttp } from 'ngx-progressbar/http';
import { Settings, SettingsService } from '@services/theme/settings.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    imports: [
        NgClass,
        RouterOutlet,
        NgProgressbar,
        NgProgressHttp
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {

    public settings: Settings;

    constructor(
        private readonly settingsService: SettingsService,
        private readonly translate: TranslateService,
    ) {
        this.settings = this.settingsService.settings;
        this.translate.addLangs(['en', 'es']);
    }
}

import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { TranslateService } from '@ngx-translate/core';
import { Settings, SettingsService } from '@services/theme/settings.service';
import { MaterialModule } from '../../../modules/material.module';

@Component({
    selector: 'app-lang',
    imports: [
        MaterialModule,
        FlexLayoutModule
    ],
    templateUrl: './lang.component.html'
})
export class LangComponent implements OnInit {

    langName = '';

    currentLang: string;
    settings: Settings;
    langs: readonly string[];

    constructor(
        private readonly translateService: TranslateService,
        private readonly settingsService: SettingsService
    ) {
        this.settings = this.settingsService.settings;
        this.langs = this.translateService.getLangs();
        this.currentLang = this.translateService.getCurrentLang();
    }

    ngOnInit() {
        this.langName = this.getLangName(this.translateService.getCurrentLang());
    }

    changeLang(lang: string) {
        this.translateService.use(lang);
        this.langName = this.getLangName(lang);
    }

    getLangName(lang: string) {
        if (lang == 'es') {
            return 'Español';
        } else if (lang == 'en') {
            return 'English';
        } else {
            return 'Español';
        }
    }

}

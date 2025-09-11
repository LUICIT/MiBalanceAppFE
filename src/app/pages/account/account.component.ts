import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { ClassDirective, LayoutAlignDirective, LayoutDirective, ShowHideDirective } from '@ngbracket/ngx-layout';
import { DomHandlerService } from '@services/theme/dom-handler.service';
import { Settings, SettingsService } from '@services/theme/settings.service';
import { MaterialModule } from "../../modules/material.module";
import { TranslatePipe, TranslateService } from "@ngx-translate/core";
import { UserService } from "@services/system/user.service";
import { UserModel } from "@models/user.model";

@Component({
    selector: 'app-account',
    imports: [
        ClassDirective,
        RouterModule,
        LayoutAlignDirective,
        LayoutDirective,
        ShowHideDirective,
        MaterialModule,
        TranslatePipe,
    ],
    templateUrl: './account.component.html'
})
export class AccountComponent implements OnInit {

    @ViewChild('sidenav') sidenav: any;

    settings: Settings;
    user: UserModel;

    sidenavOpen: boolean = true;
    links = [
        {name: this.translateService.instant('MY_ACCOUNT.NAVBAR.PROFILE'), href: 'profile', icon: 'person'},
        {name: this.translateService.instant('MY_ACCOUNT.NAVBAR.PROPERTIES'), href: 'my-properties', icon: 'view_list'},
        {name: this.translateService.instant('MY_ACCOUNT.NAVBAR.FAVORITES'), href: 'favorites', icon: 'favorite'},
    ];

    constructor(
        private readonly domHandlerService: DomHandlerService,
        private readonly translateService: TranslateService,
        private readonly settingsService: SettingsService,
        private readonly userService: UserService,
        private readonly router: Router,
    ) {
        this.settings = this.settingsService.settings;
        this.user = this.userService.getUser();
    }

    ngOnInit() {
        if (this.domHandlerService.window?.innerWidth < 960) {
            this.sidenavOpen = false;
        }
    }

    @HostListener('window:resize')
    public onWindowResize(): void {
        (this.domHandlerService.window?.innerWidth < 960) ? this.sidenavOpen = false : this.sidenavOpen = true;
    }

    ngAfterViewInit() {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                if (this.domHandlerService.window?.innerWidth < 960) {
                    this.sidenav.close();
                }
            }
        });
    }

}

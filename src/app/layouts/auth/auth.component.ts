import {AfterViewInit, Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {NavigationEnd, Router, RouterModule} from '@angular/router';
import {FlexDirective, LayoutAlignDirective, LayoutDirective} from '@ngbracket/ngx-layout';
import {FormsModule} from '@angular/forms';
import {NgScrollbarModule} from 'ngx-scrollbar';
import {Settings, SettingsService} from '@services/theme/settings.service';
import {DomHandlerService} from '@services/theme/dom-handler.service';
import {MaterialModule} from '../../modules/material.module';
import {ToolbarComponent} from '../../theme/components/toolbar/toolbar.component';
import {VerticalMenuComponent} from '../../theme/components/menu/vertical-menu/vertical-menu.component';
import {FooterComponent} from '../../theme/components/footer/footer.component';

@Component({
    selector: 'app-auth',
    imports: [
        RouterModule,
        FormsModule,
        LayoutAlignDirective,
        LayoutDirective,
        FlexDirective,
        NgScrollbarModule,
        MaterialModule,
        ToolbarComponent,
        VerticalMenuComponent,
        FooterComponent
    ],
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit, AfterViewInit {

    @ViewChild('sidenav') sidenav: any;

    toolbarTypes = [1, 2];
    headerTypes = ['default', 'image', 'carousel', 'map', 'video'];
    headerTypeOption: string;
    searchPanelVariants = [1, 2, 3];
    searchPanelVariantOption: number;
    headerFixed: boolean = false;
    showBackToTop: boolean = false;
    scrolledCount = 0;
    settings: Settings;

    constructor(
        private readonly domHandlerService: DomHandlerService,
        private readonly settingsService: SettingsService,
        private readonly router: Router,
    ) {
        this.settings = this.settingsService.settings;
    }

    ngOnInit() {
        this.headerTypeOption = this.settings.header;
        this.searchPanelVariantOption = this.settings.searchPanelVariant;
    }

    ngAfterViewInit() {
        this.domHandlerService.hidePreloader();
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.sidenav.close();
                this.settings.mainToolbarFixed = false;
                this.domHandlerService.winScroll(0, 0);
            }
        });
    }

    @HostListener('window:scroll') onWindowScroll() {
        const scrollTop = Math.max(this.domHandlerService.window?.pageYOffset, this.domHandlerService.winDocument.documentElement.scrollTop,
            this.domHandlerService.winDocument.body.scrollTop);
        scrollTop > 300 ? this.showBackToTop = true : this.showBackToTop = false;

        if (this.settings.stickyMenuToolbar) {
            let top_toolbar = this.domHandlerService.winDocument.getElementById('top-toolbar');
            if (top_toolbar) {
                if (scrollTop >= top_toolbar.clientHeight) {
                    this.settings.mainToolbarFixed = true;
                } else {
                    this.settings.mainToolbarFixed = false;
                }
            }
        }


        let load_more = this.domHandlerService.winDocument.getElementById('load-more');
        if (load_more) {
            if (this.domHandlerService.window?.innerHeight > load_more.getBoundingClientRect().top + 120) {
                if (!this.settings.loadMore.complete) {
                    if (this.settings.loadMore.start) {
                        if (this.scrolledCount < this.settings.loadMore.step) {
                            this.scrolledCount++;
                            if (!this.settings.loadMore.load) {
                                this.settings.loadMore.load = true;
                            }
                        } else {
                            this.settings.loadMore.start = false;
                            this.scrolledCount = 0;
                        }
                    }
                }
            }
        }
    }

    changeTheme(theme: string) {
        this.settings.theme = theme;
    }

    chooseHeaderType() {
        this.settings.header = this.headerTypeOption;
        this.domHandlerService.winScroll(0, 0);
        this.router.navigate(['/']).then(r => r);
    }

    chooseSearchPanelVariant() {
        this.settings.searchPanelVariant = this.searchPanelVariantOption;
    }

    scrollToTop() {
        var scrollDuration = 200;
        var scrollStep = -this.domHandlerService.window?.pageYOffset / (scrollDuration / 20);
        var scrollInterval = setInterval(() => {
            if (this.domHandlerService.window?.pageYOffset != 0) {
                this.domHandlerService.window?.scrollBy(0, scrollStep);
            } else {
                clearInterval(scrollInterval);
            }
        }, 10);
        if (this.domHandlerService.window?.innerWidth <= 768) {
            this.domHandlerService.winScroll(0, 0);
        }
    }

}

import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, DOCUMENT } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DomHandlerService {

    isBrowser: any;

    constructor(
        @Inject(DOCUMENT) private document: Document,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {
        this.isBrowser = isPlatformBrowser(platformId);
    }

    get winDocument(): Document {
        return this.document;
    }

    get window(): any {
        if (this.isBrowser) {
            return window;
        }
    }

    winScroll(y: number, x: number): void {
        if (this.isBrowser) {
            setTimeout(() => {
                window.scroll({
                    top: y,
                    left: x,
                    behavior: 'smooth',
                });
            });
        }
    }

    hidePreloader(): void {
        if (this.isBrowser) {
            setTimeout(() => {
                this.winDocument.getElementById('preloader')?.classList.add('hide');
            })
        }
    }

}

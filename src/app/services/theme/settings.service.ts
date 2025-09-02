import { Injectable } from '@angular/core';

export class Settings {

    constructor(
        public name: string,
        public theme: string,
        public stickyMenuToolbar: boolean,
        public header: string,
        public searchPanelVariant: number,
        public searchOnBtnClick: boolean,
        public currency: string,

        //additional options
        public mainToolbarFixed: boolean,
        public contentOffsetToTop: boolean,
        public headerBgImage: boolean,
        public headerBgVideo: boolean,
        public loadMore: {
            start: boolean,
            step: number,
            load: boolean,
            page: number,
            complete: boolean,
            result: number
        }
    ) {
    }

}

@Injectable({
    providedIn: 'root'
})
export class SettingsService {

    constructor() {
    }

    settings = new Settings(
        'MiBalanceApp',  // theme name
        'red',      // blue, green, red, pink, purple, grey, orange-dark
        true,        // true = sticky, false = not sticky
        'image',     // default, image, carousel, map, video
        1,           //  1, 2  or 3
        false,       //  true = search on button click
        'MXN',       // MXN, USD, EUR

        //NOTE:  don't change additional options values, they used for theme performance
        false,
        false,
        false,
        false,
        {
            start: false,
            step: 1,
            load: false,
            page: 1,
            complete: false,
            result: 0
        }
    )

}

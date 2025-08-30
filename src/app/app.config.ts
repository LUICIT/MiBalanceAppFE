import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading, withViewTransitions } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { InputFileConfig, InputFileModule } from './theme/components/input-file/input-file.module';
import { OverlayContainer } from '@angular/cdk/overlay';
import { CustomOverlayContainer } from './theme/utils/custom-overlay-container';
import { progressInterceptor } from 'ngx-progressbar/http';
import { routes } from './app.routes';
import { requestInterceptor } from '@services/interceptor/request.interceptor';

const config: InputFileConfig = {
    fileAccept: '*'
};

export const appConfig: ApplicationConfig = {
    providers: [
        // provideZoneChangeDetection({ eventCoalescing: true }),
        provideHttpClient(
            withFetch(),
            withInterceptors([
                progressInterceptor,
                requestInterceptor
            ])
        ),

        provideTranslateService({
            loader: provideTranslateHttpLoader({
                prefix: '/i18n/',
                suffix: '.json'
            }),
            fallbackLang: 'es',
            lang: 'es'
        }),

        provideRouter(
            routes,
            withViewTransitions(),
            withPreloading(PreloadAllModules),  // comment this line for enable lazy-loading
            // withHashLocation()
        ),
        provideAnimationsAsync(),

        importProvidersFrom([
            InputFileModule.forRoot(config)
        ]),
        {provide: OverlayContainer, useClass: CustomOverlayContainer}
    ]
};

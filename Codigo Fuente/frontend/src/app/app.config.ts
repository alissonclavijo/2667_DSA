import { ApplicationConfig, importProvidersFrom, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withRouterConfig } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { registerLocaleData } from '@angular/common';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import Aura from '@primeng/themes/aura';

import { routes } from './app.routes';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';

import localeEs from '@angular/common/locales/es';
import localeExtraEs from '@angular/common/locales/extra/es';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {
    AutoRefreshTokenService,
    createInterceptorCondition,
    INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
    IncludeBearerTokenCondition,
    includeBearerTokenInterceptor,
    KeycloakService,
    provideKeycloak,
    UserActivityService,
    withAutoRefreshToken
} from 'keycloak-angular';
import { environment } from '@env/environment';

registerLocaleData(localeEs, 'es', localeExtraEs);

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) =>
    new TranslateHttpLoader(http, './assets/i18n/', '.json');

const applicantServiceUrlCondition = createInterceptorCondition<IncludeBearerTokenCondition>({
    urlPattern: new RegExp('^(https?:\/\/' + environment.api.applicantService.host +  ')(\/.*)?$', 'i'),
    bearerPrefix: 'Bearer'
});

export const appConfig: ApplicationConfig = {
    providers: [
        { provide: LOCALE_ID, useValue: 'es' },
        // view more: https://github.com/mauriciovigolo/keycloak-angular
        provideKeycloak({
            config: {
                ...environment.keycloak.config
            },
            initOptions: {
                flow: 'standard',
                onLoad: 'check-sso',
                scope: 'openid profile email',
                silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html'
            } as any,
            features: [
                withAutoRefreshToken({
                    onInactivityTimeout: 'logout',
                    sessionTimeout: 60 * 60 * 24 * 1000,
                })
            ],
            providers: [AutoRefreshTokenService, UserActivityService, KeycloakService],
        }),
        {
            provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
            useValue: [applicantServiceUrlCondition]
        },
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes, withRouterConfig({
            onSameUrlNavigation: 'reload'
        })),
        provideHttpClient(withInterceptors([includeBearerTokenInterceptor])),
        provideAnimationsAsync(),
        importProvidersFrom([TranslateModule.forRoot({
            defaultLanguage: 'es',
            loader: {
                provide: TranslateLoader,
                useFactory: httpLoaderFactory,
                deps: [HttpClient],
            },
        })]),
        providePrimeNG({
            theme: {
                preset: Aura,
                options: {
                    darkModeSelector: 'class',
                    cssLayer: {
                        name: 'primeng',
                        order: 'tailwind-base, primeng, tailwind-utilities'
                    }
                }
            },
        }),
    ]
};

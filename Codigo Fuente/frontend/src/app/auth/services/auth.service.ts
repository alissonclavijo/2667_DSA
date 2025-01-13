import { inject, Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { from, Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import Keycloak, { KeycloakInstance, KeycloakProfile } from 'keycloak-js';
import { HttpClient } from '@angular/common/http';
import { AuthApplicant } from '@app/auth/models/auth-applicant.model';
import { environment } from '@env/environment';
import { ApiUtils } from '@app/core/utils';

@Injectable({providedIn: 'root'})
export class AuthService {
    #router = inject(Router);
    #keycloak: KeycloakInstance = inject(Keycloak);
    #route: ActivatedRoute = inject(ActivatedRoute);
    #location = inject(Location);
    #httpClient = inject(HttpClient);

    goToLoginPage() {
        const returnPath = this.#route.snapshot.queryParams['returnUrl'] || '';
        const redirectUri = location.protocol + '//' + location.host + returnPath;

        this.#keycloak.login({
            redirectUri: redirectUri ?? undefined
        });
    }

    userProfile(): Observable<KeycloakProfile | undefined> {
        return from(this.#keycloak.loadUserProfile() as any) as any;
    }

    isLoggedIn(): boolean {
        return this.#keycloak ? (this.#keycloak.authenticated ?? false) : false;
    }

    hasRole(role: string): boolean {
        return this.#keycloak.hasRealmRole(role);
    }

    hasRoles(...roles: string[]): boolean {
        return roles.every(role => this.hasRole(role));
    }

    register(authApplicant: AuthApplicant): Observable<any> {
        return this.#httpClient.post<any>(ApiUtils.getApiUrl('/auth/register'), authApplicant);
    }

    logout() {
        this.#keycloak.logout(window.location.origin);
    }
}

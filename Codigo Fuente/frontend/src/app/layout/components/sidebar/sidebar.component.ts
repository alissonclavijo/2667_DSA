import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { KeycloakProfile } from 'keycloak-js';

@Component({
    standalone: true,
    imports: [RouterLink, FontAwesomeModule],
    selector: 'app-sidebar',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['sidebar.component.scss']
})
export class AppSidebarComponent implements OnInit {
    userProfile: KeycloakProfile | undefined = undefined;

    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.authService.userProfile().subscribe(profile => {
            console.log('User profile:', profile);
            this.userProfile = profile;
        });
    }

    logout() {
        this.authService.logout();
    }
}

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppNavbarComponent } from '@app/layout/components/navbar/navbar.component';
import { AppSidebarComponent } from '@app/layout/components/sidebar/sidebar.component';
import { AppFooterComponent } from '@app/layout/components/footer/footer.component';
import { AppBreadcrumbComponent } from "../../components/breadcrumb/breadcrumb.component";

@Component({
    standalone: true,
    imports: [RouterOutlet, AppNavbarComponent, AppSidebarComponent, AppFooterComponent, AppBreadcrumbComponent],
    templateUrl: 'default-layout.component.html',
    encapsulation: ViewEncapsulation.None
})
export class DefaultLayoutComponent implements OnInit {
    constructor() { }
    ngOnInit() { }
}

import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
    standalone: true,
    imports: [FontAwesomeModule],
    selector: 'app-breadcrumb',
    templateUrl: 'breadcrumb.component.html',
    styleUrls: ['breadcrumb.component.scss'],
})
export class AppBreadcrumbComponent implements OnInit {
    constructor() { }
    ngOnInit() { }
}

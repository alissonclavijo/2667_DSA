import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    standalone: true,
    templateUrl: 'auth-layout.component.html',
    styleUrls: ['auth-layout.component.scss'],
    imports: [RouterOutlet]
})
export class AuthLayoutComponent implements OnInit {
    constructor() { }
    ngOnInit() { }
}

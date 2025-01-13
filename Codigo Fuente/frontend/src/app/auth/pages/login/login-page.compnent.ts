import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { delay, lastValueFrom, Observable, of } from 'rxjs';

@Component({
    standalone: true,
    templateUrl: 'login-page.component.html',
    imports: [ReactiveFormsModule, CommonModule, RouterLink]
})
export class LoginPageComponent implements OnInit {
    form = new FormGroup({
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required])
    });
    error = '';
    submitting = false;

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit() {

    }

    async login() {
        this.authService.goToLoginPage();
    }
}

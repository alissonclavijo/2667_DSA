import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'auth',
        loadComponent: () => import('@app/layout/layouts/auth/auth-layout.component').then(m => m.AuthLayoutComponent),
        children: [
            {
                path: 'login',
                loadComponent: () => import('@app/auth/pages/login/login-page.compnent').then(m => m.LoginPageComponent),
            },
            {
                path: 'register',
                loadComponent: () => import('@app/auth/pages/register/register-page.component').then(m => m.RegisterPageComponent),
            }
        ]
    }
];

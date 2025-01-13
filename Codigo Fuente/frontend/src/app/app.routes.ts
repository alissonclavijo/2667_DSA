import { Routes } from '@angular/router';
import { authGuard, loggedInGuard } from '@app/auth/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        canActivate: [authGuard],
        loadComponent: () => import('@app/layout/layouts/default/default-layout.component').then(m => m.DefaultLayoutComponent),
        children: [
            {
                path: '',
                loadChildren: () => import('@app/job-application/job-application.routes').then(m => m.routes)
            }
        ]
    },
    {
        path: '',
        canActivate: [loggedInGuard],
        loadChildren: () => import('@app/auth/auth.routes').then(m => m.routes)
    }
];

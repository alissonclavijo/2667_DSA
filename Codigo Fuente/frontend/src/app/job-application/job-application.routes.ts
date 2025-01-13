import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'job-application',
        children: [
            {
                path: 'register-information',
                loadComponent: () => import('./pages/register-information/register-information-page.component').then(m => m.RegisterInformationPageComponent)
            }
        ]
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'job-application/register-information',
    }
];

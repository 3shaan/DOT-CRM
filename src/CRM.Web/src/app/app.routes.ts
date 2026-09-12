import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/pages/dashboard/dashboard').then(m => m.Dashboard)
    }
];

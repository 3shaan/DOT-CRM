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
    },
    {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.route').then(m => m.authRouter)
    }
];

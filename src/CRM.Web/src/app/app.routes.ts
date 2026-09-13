import { Routes } from '@angular/router';
import { authGuard } from '@core/auth/auth-guard';

const loadDashboard = () =>
  import('./features/dashboard/pages/dashboard/dashboard').then((m) => m.Dashboard);

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.route').then((m) => m.authRouter),
  },
  {
    path: '',
    loadComponent: () => import('./core/layout/app-layout/app-layout').then((m) => m.AppLayout),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      { path: 'dashboard', loadComponent: loadDashboard },
      { path: 'tasks', loadComponent: loadDashboard },
      { path: 'apps', loadComponent: loadDashboard },
      { path: 'chats', loadComponent: loadDashboard },
      { path: 'users', loadComponent: loadDashboard },
      { path: 'customers', loadComponent: loadDashboard },
      { path: 'products', loadComponent: loadDashboard },
      { path: 'settings', loadComponent: loadDashboard },
      {
        path: 'errors',
        children: [
          { path: '404', loadComponent: loadDashboard },
          { path: '500', loadComponent: loadDashboard },
        ],
      },
    ],
  },
];

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
    canActivate: [authGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      { path: 'dashboard', loadComponent: loadDashboard },
      { path: 'users', loadChildren: () => import('./features/users/user.route').then((m) => m.userRoute) },
     
    ],
  },
];

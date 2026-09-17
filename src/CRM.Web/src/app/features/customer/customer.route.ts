import { Routes } from '@angular/router';

export const customerRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/customer').then((m) => m.Customer),
  },
  {
    path: 'add',
    loadComponent: () => import('./pages/add-customer').then((m) => m.AddCustomer),
  },
];

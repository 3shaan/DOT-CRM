import { Routes } from "@angular/router";

export const customerRoute: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/customer').then(m => m.Customer),
    }
]
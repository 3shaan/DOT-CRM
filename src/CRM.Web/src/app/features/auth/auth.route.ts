import { Routes } from "@angular/router";

export const authRouter : Routes = [
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login').then(m => m.Login)
    },
    {
        path: 'registration',
        loadComponent: () => import('./pages/registration/registration').then(m => m.Registration)
    }
]
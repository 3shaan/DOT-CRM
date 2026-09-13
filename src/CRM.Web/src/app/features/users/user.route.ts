import { Routes } from "@angular/router";
import { User } from "./services/user";

export const userRoute: Routes = [{
    path: '',
    loadComponent: () => import('./pages/user/user').then((m) => m.User),
}]
import { Routes } from '@angular/router';
import { PublicComponent } from '@layouts/public/public.component';

export const routes: Routes = [
    {
        path: '404',
        loadComponent: () => import('./not-found/not-found.component').then(c => c.NotFoundComponent)
    },
    {
        path: '',
        component: PublicComponent,
        children: [
            {
                path: 'login',
                loadComponent: () => import('./auth/login/login.component').then(c => c.LoginComponent)
            },
            {
                path: 'register',
                loadComponent: () => import('./auth/register/register.component').then(c => c.RegisterComponent)
            }
        ]
    }
    /*{
        path: '',
        component: AuthComponent,
        children: [
            {
                path: 'login',
                loadComponent: () => import('./auth/login/login.component').then(c => c.LoginComponent)
            },
            {
                path: 'register',
                loadComponent: () => import('./auth/register/register.component').then(c => c.RegisterComponent)
            }
        ]
    }*/
];

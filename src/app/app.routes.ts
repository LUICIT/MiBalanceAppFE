import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '404',
        pathMatch: 'full',
    },
    {
        path: '',
        loadChildren: () => import('./pages/pages.routes').then(p => p.routes)
    },
    {
        path: '**',
        redirectTo: '404',
    }
];

import { Routes } from '@angular/router';
import { menuRoutes } from './menu/menu.routes';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadComponent: () => import('./layout/layout.component').then(({ LayoutComponent }) => LayoutComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./global/pages/home/home.component')
            }
        ]
    },
    ...menuRoutes,
    {
        path: '**',
        loadComponent: () => import('./global/pages/page-not-found/page-not-found.component')
    },
];

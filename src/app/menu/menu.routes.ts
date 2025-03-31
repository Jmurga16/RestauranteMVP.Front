import { Routes } from '@angular/router';

export const menuRoutes: Routes = [{
    path: 'menu',
    loadComponent: () => import('@layout/layout.component').then(({ LayoutComponent }) => LayoutComponent),
    children: [

    ]
}];

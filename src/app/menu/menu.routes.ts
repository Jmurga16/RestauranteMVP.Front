import { Routes } from '@angular/router';

export const menuRoutes: Routes = [{
    path: 'menu',
    loadComponent: () => import('@layout/layout.component').then(({ LayoutComponent }) => LayoutComponent),
    children: [
        {
            path: 'carta',
            loadComponent: () => import('./pages/carta/carta.component').then(m => m.CartaComponent)
        },
        {
            path: 'encargado',
            loadComponent: () => import('./pages/encargado/encargado.component').then(m => m.EncargadoComponent)
        },
        {
            path: 'ingredientes',
            loadComponent: () => import('./pages/ingredientes/ingredientes.component').then(m => m.IngredientesComponent)
        },
        {
            path: 'plato',
            loadComponent: () => import('./pages/plato/plato.component').then(m => m.PlatoComponent)
        },
        {
            path: 'receta',
            loadComponent: () => import('./pages/receta/receta.component').then(m => m.RecetaComponent)
        }
    ]
}];

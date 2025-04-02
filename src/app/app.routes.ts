import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'rechner',
    loadComponent: () => import('./features/rechner/rechner-page/rechner-page.component').then(m => m.RechnerPageComponent)
  },
  {
    path: 'check',
    loadComponent: () => import('./features/check/check-page/check-page.component').then(m => m.CheckPageComponent)
  },
  {
    path: 'notar',
    loadComponent: () => import('./features/notar/notar-page/notar-page.component').then(m => m.NotarPageComponent)
  },
  {
    path: 'dokumente',
    loadComponent: () => import('./features/dokumente/dokumente-page/dokumente-page.component').then(m => m.DokumentePageComponent)
  },
  {
    path: 'demo',
    loadComponent: () => import('./features/demo/demo-page/demo-page.component').then(m => m.DemoPageComponent)
  },
  {
    path: '',
    redirectTo: 'rechner',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'rechner'
  }
];

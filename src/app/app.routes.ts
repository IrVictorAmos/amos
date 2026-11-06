import { Routes } from '@angular/router';
import { Home } from './pages/home/home';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Victor Amos — Ingénieur logiciel, architecture web et mobile',
  },
  {
    path: 'projets/:slug',
    loadComponent: () => import('./pages/project/project').then((m) => m.ProjectPage),
  },
  { path: '**', redirectTo: '' },
];

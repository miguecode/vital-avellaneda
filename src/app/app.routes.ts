import { Routes } from '@angular/router';
import { HomePageComponent } from './features/landing/pages/home-page/home-page.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/landing/pages/home-page/home-page.component').then(
        (m) => m.HomePageComponent
      ),
    pathMatch: 'full',
  },
];

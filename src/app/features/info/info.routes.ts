import { Routes } from '@angular/router';

export const INFO_ROUTES: Routes = [
  {
    path: ':slug',
    loadComponent: () =>
      import('./pages/info-detail-page/info-detail-page.component').then(
        (m) => m.InfoDetailPageComponent
      ),
  },
  {
    path: 'user/help',
    loadComponent: () =>
      import('./pages/info-help-page/info-help-page.component').then(
        (m) => m.InfoHelpPageComponent
      ),
  }
];
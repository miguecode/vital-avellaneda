import { Routes } from '@angular/router';

export const NEWS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/news-list-page/news-list-page.component').then(
        (m) => m.NewsListPageComponent
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/news-detail-page/news-detail-page.component').then(
        (m) => m.NewsDetailPageComponent
      ),
  },
];
import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { publicGuard } from './core/guards/public.guard';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // Main (/home)
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./features/landing/landing.routes').then(
            (m) => m.LANDING_ROUTES
          ),
      },
    ],
  },
  // Authentication (/login, /register)
  // Public Paths: Only for not authenticated users
  {
    path: 'auth',
    component: AuthLayoutComponent,
    canActivate: [publicGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/auth/auth.routes').then(
            (m) => m.AUTH_ROUTES
          ),
      },
    ],
  },
  // Dashboard (/patient, /specialist)
  // Private Paths: Only for authenticated users
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/dashboard/dashboard.routes').then(
            (m) => m.DASHBOARD_ROUTES
          ),
      },
    ],
  },
  // News (/news, /news/:id)
  // Public Paths: For all users
  {
    path: 'news',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/news/news.routes').then(
            (m) => m.NEWS_ROUTES
          ),
      },
    ],
  },
  // Info (/info/:slug, /info/help)
  // Public Paths: For all users
  {
    path: 'info',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/info/info.routes').then(
            (m) => m.INFO_ROUTES
          ),
      }
    ]
  },
  // Not Found Page
  {
    path: '**',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./features/errors/pages/not-found/not-found.page').then(m => m.NotFoundPage)
      }
    ]
  }
];
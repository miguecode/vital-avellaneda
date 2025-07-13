import { Routes } from '@angular/router';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: 'patient',
    loadComponent: () =>
      import('./pages/patient-home/patient-home.component').then(
        (m) => m.PatientHomeComponent
      ),
  },
  {
    path: 'specialist',
    loadComponent: () =>
      import('./pages/specialist-home/specialist-home.component').then(
        (m) => m.SpecialistHomeComponent
      ),
  },
]; 
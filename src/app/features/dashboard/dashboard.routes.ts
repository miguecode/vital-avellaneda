import { Routes } from '@angular/router';
import { roleGuard } from '../../core/guards/role.guard';
import { UserRoles } from '../../core/enums';

export const DASHBOARD_ROUTES: Routes = [
  // Only for authenticated users with Patient rol
  {
    path: 'patient',
    canActivate: [roleGuard([UserRoles.PATIENT])],
    loadComponent: () =>
      import('./pages/patient-home/patient-home.component').then(
        (m) => m.PatientHomeComponent
      ),
  },
  // Only for authenticated users with Specialist or Admin rol
  {
    path: 'specialist',
    canActivate: [roleGuard([UserRoles.SPECIALIST, UserRoles.ADMIN])],
    loadComponent: () =>
      import('./pages/specialist-home/specialist-home.component').then(
        (m) => m.SpecialistHomeComponent
      ),
  },
]; 
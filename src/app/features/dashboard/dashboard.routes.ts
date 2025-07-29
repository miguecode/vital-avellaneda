import { Routes } from '@angular/router';
import { roleGuard } from '../../core/guards/role.guard';
import { UserRoles } from '../../core/enums';

export const DASHBOARD_ROUTES: Routes = [
  // Only for authenticated users with Patient role
  {
    path: 'patient',
    canActivate: [roleGuard([UserRoles.PATIENT])],
    loadComponent: () =>
      import('./pages/patient-page/patient-page.component').then(
        (m) => m.PatientPageComponent
      ),
  },
  {
    path: 'request-appointment',
    canActivate: [roleGuard([UserRoles.PATIENT])],
    loadComponent: () =>
      import('./pages/request-appointment-page/request-appointment-page.component').then(
        (m) => m.RequestAppointmentPageComponent
      ),
  },
  // Only for authenticated users with Specialist or Admin role
  {
    path: 'specialist',
    canActivate: [roleGuard([UserRoles.SPECIALIST, UserRoles.ADMIN])],
    loadComponent: () =>
      import('./pages/specialist-page/specialist-page.component').then(
        (m) => m.SpecialistPageComponent
      ),
  },
  {
    path: 'profile/edit',
    canActivate: [roleGuard([UserRoles.PATIENT, UserRoles.SPECIALIST, UserRoles.ADMIN])],
    loadComponent: () =>
      import('./pages/user-edit-page/user-edit-page.component').then(
        (m) => m.UserEditPageComponent
      ),
  },
];
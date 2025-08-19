import { Routes } from '@angular/router';
import { roleGuard } from '../../core/guards/role.guard';
import { UserRoles } from '../../core/enums';
import { idGuard } from '../../core/guards/id.guard';
import { medicalRecordGuard } from '../../core/guards/medical-record.guard';

export const DASHBOARD_ROUTES: Routes = [
  // Authenticated users with Patient role
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
  // Authenticated users with Specialist role
  {
    path: 'specialist',
    canActivate: [roleGuard([UserRoles.SPECIALIST])],
    loadComponent: () =>
      import('./pages/specialist-page/specialist-page.component').then(
        (m) => m.SpecialistPageComponent
      ),
  },
  // Authenticated users with Patient or Specialist role
  {
    path: 'appointments-list',
    canActivate: [roleGuard([UserRoles.PATIENT, UserRoles.SPECIALIST])],
    loadComponent: () =>
      import('./pages/appointment-list-page/appointment-list-page.component').then(
        (m) => m.AppointmentListPageComponent
      ),
  },
  {
    path: 'appointments-manage/:id',
    canActivate: [roleGuard([UserRoles.PATIENT, UserRoles.SPECIALIST]), idGuard],
    loadComponent: () =>
      import('./pages/appointment-manage-page/appointment-manage-page.component').then(
        (m) => m.AppointmentManagePageComponent
      ),
  },
  {
    path: 'user-medical-record/:id',
    canActivate: [roleGuard([UserRoles.PATIENT, UserRoles.SPECIALIST]), medicalRecordGuard],
    loadComponent: () =>
      import('./pages/user-medical-record-page/user-medical-record-page.component').then(
        (m) => m.UserMedicalRecordPageComponent
      ),
  },
  {
    path: 'patients-list',
    canActivate: [roleGuard([UserRoles.SPECIALIST])],
    loadComponent: () =>
      import('./pages/patient-list-page/patient-list-page.component').then(
        (m) => m.PatientListPageComponent
      ),
  },
  // Authenticated users
  {
    path: 'profile/edit',
    canActivate: [roleGuard([UserRoles.PATIENT, UserRoles.SPECIALIST, UserRoles.ADMIN])],
    loadComponent: () =>
      import('./pages/user-edit-page/user-edit-page.component').then(
        (m) => m.UserEditPageComponent
      ),
  },
];
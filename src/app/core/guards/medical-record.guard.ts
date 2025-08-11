import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthFacade } from '../../features/auth/auth.facade';
import { UserRoles } from '../enums';

export const medicalRecordGuard = (
  route: ActivatedRouteSnapshot
): boolean => {
  const authFacade = inject(AuthFacade);
  const router = inject(Router);
  const user = authFacade.user();

  const patientIdFromRoute = route.paramMap.get('id');

  if (!user || !patientIdFromRoute) {
    router.navigate(['/home']);
    return false;
  }

  // A specialist can see any patient's medical record.
  if (user.role === UserRoles.SPECIALIST) {
    return true;
  }

  // A patient can only see their own medical record.
  if (user.role === UserRoles.PATIENT) {
    if (user.id === patientIdFromRoute) {
      return true;
    }
  }

  router.navigate(['/dashboard/patient']);
  return false;
};

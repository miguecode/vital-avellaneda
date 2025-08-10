import { inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthFacade } from '../../features/auth/auth.facade';
import { AppointmentFacade } from '../../features/appointments/appointment.facade';

export const idGuard = async (
  route: ActivatedRouteSnapshot
): Promise<boolean> => {
  const authFacade = inject(AuthFacade);
  const appointmentFacade = inject(AppointmentFacade);
  const router = inject(Router);

  const appointmentId = route.paramMap.get('id');
  const user = authFacade.user();

  if (!appointmentId || !user) {
    router.navigate(['/home']);
    return false;
  }

  await appointmentFacade.loadAppointmentById(appointmentId);

  const appointment = appointmentFacade.selectedAppointment();

  if (
    appointment &&
    (user.id === appointment.patientId || user.id === appointment.specialistId)
  ) {
    return true;
  }

  router.navigate(['/dashboard/appointments-list']);
  return false;
};

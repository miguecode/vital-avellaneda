import { InjectionToken } from '@angular/core';
import { AppointmentRepository } from './appointment.repository';

export const APPOINTMENT_REPOSITORY = new InjectionToken<AppointmentRepository>(
  'APPOINTMENT_REPOSITORY'
);
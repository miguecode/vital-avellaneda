import { Diagnosis, Rating } from '../models';
import { AppointmentStatus } from '../enums/';

export interface Appointment {
  id: string;
  patientId: string;
  specialistId: string;
  date: Date;
  status: AppointmentStatus;
  cancelationReason?: string;
  diagnosis?: Diagnosis;
  rating?: Rating;
}

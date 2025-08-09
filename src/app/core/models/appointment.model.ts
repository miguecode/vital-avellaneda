import { Diagnosis, Rating, Specialty } from '../models';
import { AppointmentStatus, UserRoles } from '../enums/';

export interface Appointment {
  id: string;
  patientId: string;
  specialistId: string;
  specialistFirstName: string,
  specialistLastName: string,
  patientFirstName: string,
  patientLastName: string,
  status: AppointmentStatus;
  date: Date;
  specialty: Specialty;
  creationDate: Date;
  cancelationReason?: string;
  canceledBy?: UserRoles;
  diagnosis?: Diagnosis;
  rating?: Rating;
}
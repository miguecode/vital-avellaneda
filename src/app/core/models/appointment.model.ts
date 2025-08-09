import { Diagnosis, Rating, Specialty } from '../models';
import { AppointmentStatus } from '../enums/';

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
  diagnosis?: Diagnosis;
  rating?: Rating;
}
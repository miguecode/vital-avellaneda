import { AppointmentStatus } from '../enums';
import { Appointment } from '../models';

export interface AppointmentRepository {
  create(appointment: Appointment): Promise<void>;
  getById(id: string): Promise<Appointment | null>;
  update(appointment: Partial<Appointment>): Promise<void>;
  getForPatient(patientId: string): Promise<Appointment[]>;
  getForSpecialist(specialistId: string): Promise<Appointment[]>;
  getCompletedForPatient(patientId: string): Promise<Appointment[]>;
  getForSpecialistByStatuses(specialistId: string, statuses: AppointmentStatus[]): Promise<Appointment[]>;
  getAppointmentsBySpecialistAndDateRange(specialistId: string, startDate: Date, endDate: Date): Promise<Appointment[]>;
  getAppointmentsByPatientAndDateRange(patientId: string, startDate: Date, endDate: Date): Promise<Appointment[]>;
}
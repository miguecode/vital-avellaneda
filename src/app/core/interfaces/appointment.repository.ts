import { Appointment } from '../models';

export interface AppointmentRepository {
  create(appointment: Appointment): Promise<void>;
  getById(id: string): Promise<Appointment | null>;
  update(appointment: Partial<Appointment>): Promise<void>;
}

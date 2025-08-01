import { Injectable, inject, signal } from '@angular/core';
import { APPOINTMENT_REPOSITORY } from '../../core/interfaces/appointment.repository.token';
import { Appointment, Specialist, Specialty } from '../../core/models';
import { AuthFacade } from '../auth/auth.facade';
import { AutoId } from '../../core/utils/auto-id';
import { AppointmentStatus } from '../../core/enums';

@Injectable({ providedIn: 'root' })
export class AppointmentsFacade {
  private appointmentService = inject(APPOINTMENT_REPOSITORY);
  private authFacade = inject(AuthFacade);

  // Private signals (source of truth)
  private _saving = signal(false);
  private _error = signal<string | null>(null);

  // Public signals (to communicate with others)
  readonly isSaving = this._saving.asReadonly();
  readonly error = this._error.asReadonly();

  async createAppointment(
    specialty: Specialty,
    specialist: Specialist,
    date: Date
  ): Promise<Appointment | null> {
    this._saving.set(true);
    this._error.set(null);

    const patient = this.authFacade.user();
    if (!patient || patient.role !== 'patient') {
      this._error.set('Usuario no autenticado, o no es paciente.');
      this._saving.set(false);
      return null;
    }

    const newAppointment: Appointment = {
      id: AutoId.newId(),
      patientId: patient.id,
      specialistId: specialist.id,
      specialty,
      date,
      status: AppointmentStatus.PENDING,
      creationDate: new Date(),
    };

    await this.appointmentService.create(newAppointment);
    this._saving.set(false);
    return newAppointment;
  }
}

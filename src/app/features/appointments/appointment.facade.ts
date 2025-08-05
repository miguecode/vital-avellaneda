import { Injectable, inject, signal } from '@angular/core';
import { APPOINTMENT_REPOSITORY } from '../../core/interfaces/appointment.repository.token';
import { Appointment, Specialist, Specialty } from '../../core/models';
import { AuthFacade } from '../auth/auth.facade';
import { AutoId } from '../../core/utils/auto-id';
import { AppointmentStatus, UserRoles } from '../../core/enums';

@Injectable({ providedIn: 'root' })
export class AppointmentFacade {
  private appointmentService = inject(APPOINTMENT_REPOSITORY);
  private authFacade = inject(AuthFacade);
  
  // Private signals (source of truth)
  private _appointments = signal<Appointment[]>([]);
  private _loading = signal(false);
  private _error = signal<string | null>(null);
  
  // Public signals (to communicate with others)
  public readonly appointments = this._appointments.asReadonly();
  readonly isLoading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  async createAppointment(
    specialty: Specialty,
    specialist: Specialist,
    date: Date
  ): Promise<Appointment | null> {
    this._loading.set(true);
    this._error.set(null);

    const patient = this.authFacade.user();
    if (!patient || patient.role !== 'patient') {
      this._error.set('Usuario no autenticado, o no es paciente.');
      this._loading.set(false);
      return null;
    }

    const newAppointment: Appointment = {
      id: AutoId.newId(),
      patientId: patient.id,
      specialistId: specialist.id,
      specialistFirstName: specialist.firstName,
      specialistLastName: specialist.lastName,
      patientFirstName: patient.firstName,
      patientLastName: patient.lastName,
      specialty,
      date,
      status: AppointmentStatus.PENDING,
      creationDate: new Date(),
    };

    await this.appointmentService.create(newAppointment);
    this._appointments.set([...this._appointments(), newAppointment]);
    this._loading.set(false);
    return newAppointment;
  }

  async loadUserAppointments(): Promise<void> {
    console.log('loadUserAppointments Started');

    const user = this.authFacade.user();
    if (!user) {
      this._appointments.set([]);
      return;
    }

    this._loading.set(true);
    this._error.set(null);
    try {
      let appointments: Appointment[] = [];
      if (user.role === UserRoles.PATIENT) {
        appointments = await this.appointmentService.getForPatient(user.id);
      } else if (user.role === UserRoles.SPECIALIST) {
        appointments = await this.appointmentService.getForSpecialist(user.id);
      }
      this._appointments.set(appointments);
    } catch (err: any) {
      this._error.set(err.message || 'Error al obtener los turnos');
    } finally {
      this._loading.set(false);
    }
  }
}

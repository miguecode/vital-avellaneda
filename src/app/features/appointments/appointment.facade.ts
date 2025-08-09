import { Injectable, effect, inject, signal } from '@angular/core';
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
  private _selectedAppointment = signal<Appointment | null>(null);

  // Public signals (to communicate with others)
  public readonly appointments = this._appointments.asReadonly();
  readonly isLoading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();
  public readonly selectedAppointment = this._selectedAppointment.asReadonly();

  constructor() {
    effect(() => {
      if (this.authFacade.user() === null) {
        this._appointments.set([]);
      }
    });
  }

  // Manual settings
  setAppointments(appointments: Appointment[]): void {
    this._appointments.set(appointments);
  }

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
    const updatedAppointments = [...this._appointments(), newAppointment].sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );
    this._appointments.set(updatedAppointments);
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

  async loadAppointmentById(id: string): Promise<void> {
    this._loading.set(true);
    this._error.set(null);
    this._selectedAppointment.set(null);

    const existing = this.appointments().find((a) => a.id === id);
    if (existing) {
      this._selectedAppointment.set(existing);
      this._loading.set(false);
      return;
    }

    try {
      const appointment = await this.appointmentService.getById(id);
      this._selectedAppointment.set(appointment);
    } catch (err: any) {
      this._error.set(err.message || 'Error al obtener el turno');
    } finally {
      this._loading.set(false);
    }
  }

  async updateAppointment(
    id: string,
    updates: Partial<Appointment>
  ): Promise<void> {
    this._loading.set(true);
    this._error.set(null);
    try {
      await this.appointmentService.update({ id, ...updates });
      const currentAppointments = this._appointments();
      const updatedAppointments = currentAppointments.map(app =>
        app.id === id ? { ...app, ...updates } : app
      );
      this._appointments.set(updatedAppointments);

      if (this._selectedAppointment()?.id === id) {
        this._selectedAppointment.update(app => ({ ...app!, ...updates }));
      }

    } catch (err: any) {
      this._error.set(err.message || 'Error al actualizar el turno');
    } finally {
      this._loading.set(false);
    }
  }
}
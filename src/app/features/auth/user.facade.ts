import { Injectable, inject, signal } from '@angular/core';
import { USER_REPOSITORY } from '../../core/interfaces/user.repository.token';
import { Patient, Specialist, UserBase } from '../../core/models';
import { AuthFacade } from './auth.facade';
import { AppointmentFacade } from '../appointments/appointment.facade';
import { AppointmentStatus } from '../../core/enums';

@Injectable({ providedIn: 'root' })
export class UserFacade {
  private userService = inject(USER_REPOSITORY);
  private authFacade = inject(AuthFacade);
  private appointmentFacade = inject(AppointmentFacade);

  // Private signals (source of truth)
  private _saving = signal(false);
  private _error = signal<string | null>(null);
  private _users = signal<UserBase[]>([]);
  private _patients = signal<Patient[]>([]);

  // Public signals (to communicate with others)
  readonly isSaving = this._saving.asReadonly();
  readonly error = this._error.asReadonly();
  readonly users = this._users.asReadonly();
  readonly patients = this._patients.asReadonly();

  async createUser(user: Patient | Specialist): Promise<void> {
    this._saving.set(true);
    this._error.set(null);

    try {
      await this.userService.createUser(user);
    } catch (err: any) {
      this._error.set(err.message || 'Error creando al usuario');
      throw err;
    } finally {
      this._saving.set(false);
    }
  }

  async dniExists(dni: string): Promise<boolean> {
    const exists = await this.userService.dniExists(dni);

    if (exists) {
      this._error.set('Ese DNI ya está registrado.');
    } else {
      this._error.set(null);
    }

    return exists;
  }

  async updateUser(updatedData: Partial<Patient | Specialist>): Promise<void> {
    this._saving.set(true);
    this._error.set(null);

    try {
      await this.userService.updateUser(updatedData);
      // Only update the authenticated user's signal if the updated user is the authenticated user
      if (this.authFacade.user()?.id === updatedData.id) {
        const updatedUser = await this.userService.getUserById(updatedData.id!);
        if (updatedUser) {
          this.authFacade.setUser(updatedUser);
        } else {
          throw new Error(
            `No se pudo obtener el usuario actualizado con el ID: ${updatedData.id}`
          );
        }
      }
    } catch (err: any) {
      this._error.set(err.message || 'Error al actualizar el usuario');
      throw err;
    } finally {
      this._saving.set(false);
    }
  }

  async getUsersByRole(role: string): Promise<void> {
    console.log('Get Users By Role Started');

    this._saving.set(true);
    this._error.set(null);
    try {
      const users = await this.userService.getUsersByRole(role);
      this._users.set(users);
    } catch (err: any) {
      this._error.set(err.message || 'Error obteniendo usuarios por rol');
      throw err;
    } finally {
      this._saving.set(false);
    }
  }

  async getUserById(id: string): Promise<UserBase | null> {
    this._saving.set(true);
    this._error.set(null);
    try {
      return await this.userService.getUserById(id);
    } catch (err: any) {
      this._error.set(err.message || 'Error obteniendo usuarios por rol');
      throw err;
    } finally {
      this._saving.set(false);
    }
  }

  async loadPatientsForSpecialist(specialistId: string): Promise<void> {
    this._saving.set(true);
    this._error.set(null);
    try {
      const appointments =
        await this.appointmentFacade.getSpecialistAppointmentsByStatus(
          specialistId,
          [AppointmentStatus.PENDING, AppointmentStatus.COMPLETED]
        );

      const patientIds = [...new Set(appointments.map((a) => a.patientId))];

      if (patientIds.length > 0) {
        const patients = await this.userService.getUsersByIds(patientIds);
        this._patients.set(patients as Patient[]);
      } else {
        this._patients.set([]);
      }
    } catch (err: any) {
      this._error.set(err.message || 'Error obteniendo los pacientes');
    } finally {
      this._saving.set(false);
    }
  }
}

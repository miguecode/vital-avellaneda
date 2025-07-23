import { Injectable, inject, signal } from '@angular/core';
import { USER_REPOSITORY } from '../../core/interfaces/user.repository.token';
import { Patient, Specialist } from '../../core/models';
import { AuthFacade } from './auth.facade';

@Injectable({ providedIn: 'root' })
export class UserFacade {
  private userService = inject(USER_REPOSITORY);
  private authFacade = inject(AuthFacade);
  
  // Private signals (source of truth)
  private _saving = signal(false);
  private _error = signal<string | null>(null);

  // Public signals (to communicate with others)
  readonly isSaving = this._saving.asReadonly();
  readonly error = this._error.asReadonly();

  async createUser(user: Patient | Specialist): Promise<void> {
    this._saving.set(true);
    this._error.set(null);

    try {
      await this.userService.createUser(user);
    } catch (err: any) {
      this._error.set(err.message || 'Error creating user');
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
      const updatedUser = await this.userService.getUserById(updatedData.id!);
      if (updatedUser) {
        this.authFacade.setUser(updatedUser);
      } else {
        throw new Error(`No se pudo obtener el usuario actualizado con el ID: ${updatedData.id}`);
      }
    } catch (err: any) {
      this._error.set(err.message || 'Error al actualizar el usuario');
      throw err;
    } finally {
      this._saving.set(false);
    }
  }
}

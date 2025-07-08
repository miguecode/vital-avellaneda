import { Injectable, inject, signal } from '@angular/core';
import { USER_REPOSITORY } from '../../core/interfaces/user.repository.token';
import { Patient, Specialist } from '../../core/models';

@Injectable({ providedIn: 'root' })
export class UserFacade {
  private userService = inject(USER_REPOSITORY);

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
}

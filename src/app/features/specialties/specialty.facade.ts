import { Injectable, inject, signal } from '@angular/core';
import { Specialty } from '../../core/models';
import { SPECIALTY_REPOSITORY } from '../../core/interfaces/specialty.repository.token';

@Injectable({
  providedIn: 'root',
})
export class SpecialtyFacade {
  private specialtyService = inject(SPECIALTY_REPOSITORY);
  
  // Private signals (source of truth)
  private _specialties = signal<Specialty[]>([]);

  // Public signal (to communicate with others)
  readonly specialties = this._specialties.asReadonly();

  async loadSpecialties(): Promise<void> {
    const data = await this.specialtyService.getAll();
    this._specialties.set(data);
  }
}

import { InjectionToken } from '@angular/core';
import { SpecialtyRepository } from './specialty.repository';

export const SPECIALTY_REPOSITORY = new InjectionToken<SpecialtyRepository>(
  'SPECIALTY_REPOSITORY'
);

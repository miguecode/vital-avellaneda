import { UserBase } from '../models';

export interface Patient extends UserBase {
  healthInsurance?: string;
  medicalRecordId: string;
}
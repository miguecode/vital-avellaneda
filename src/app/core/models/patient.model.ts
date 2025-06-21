import { UserBase } from '../models';

export interface Paciente extends UserBase {
  healthInsurance?: string;
  medicalRecordId: string;
}
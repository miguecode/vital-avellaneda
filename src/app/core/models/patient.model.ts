import { UserBase } from '../models';
import { BloodTypes, HealthInsurances } from '../enums';

export interface Patient extends UserBase {
  // medicalRecordId: string;
  healthInsurance: HealthInsurances;
  height?: number;
  weight?: number;
  bloodType: BloodTypes;
}
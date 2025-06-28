import { UserBase } from '../models';
import { BloodTypes } from '../enums';

export interface Patient extends UserBase {
  medicalRecordId: string;
  healthInsurance?: string;
  height?: number;
  weight?: number;
  bloodType?: BloodTypes;
}
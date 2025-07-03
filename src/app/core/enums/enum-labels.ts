import { BloodTypes, HealthInsurances, Sex } from './index';

// Health Insurance
export const HEALTH_INSURANCE_LABELS = new Map<string, string>([
  [HealthInsurances.OSDE, 'OSDE'],
  [HealthInsurances.SWISS_MEDICAL, 'Swiss Medical'],
  [HealthInsurances.GALENO, 'Galeno'],
  [HealthInsurances.MEDICUS, 'Medicus'],
  [HealthInsurances.HOSPITAL_ALEMÁN, 'Hospital Alemán'],
  [HealthInsurances.HOSPITAL_BRITÁNICO, 'Hospital Británico'],
  [HealthInsurances.OMINT, 'Omint'],
  [HealthInsurances.PAMI, 'PAMI'],
  [HealthInsurances.OSECAC, 'OSECAC'],
  [HealthInsurances.UP, 'Unión Personal'],
  [HealthInsurances.OSPE, 'OSPe'],
  [HealthInsurances.UNSPECIFIED, 'Sin especificar'],
]);

// Sex
export const SEX_LABELS = new Map<string, string>([
  [Sex.MALE, 'Masculino'],
  [Sex.FEMALE, 'Femenino'],
  [Sex.OTHER, 'Otro'],
  [Sex.UNSPECIFIED, 'Sin especificar'],
]);

// Blood type
export const BLOOD_TYPE_LABELS = new Map<string, string>([
  [BloodTypes.A_POS, 'A positivo'],
  [BloodTypes.A_NEG, 'A negativo'],
  [BloodTypes.B_POS, 'B positivo'],
  [BloodTypes.B_NEG, 'B negativo'],
  [BloodTypes.AB_POS, 'AB positivo'],
  [BloodTypes.AB_NEG, 'AB negativo'],
  [BloodTypes.O_POS, 'O positivo'],
  [BloodTypes.O_NEG, 'O negativo'],
  [BloodTypes.UNSPECIFIED, 'Sin especificar'],
]);
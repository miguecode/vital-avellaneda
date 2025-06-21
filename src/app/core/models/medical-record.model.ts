import { ClinicalEntry } from '../models';

export interface MedicalRecord {
  id: string;
  patientId: string;
  entries: ClinicalEntry[];
}

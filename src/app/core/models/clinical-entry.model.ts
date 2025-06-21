import { Diagnosis } from '../models';

export interface ClinicalEntry {
  date: Date;
  specialist: string;
  speciality: string;
  diagnosis: Diagnosis;
}

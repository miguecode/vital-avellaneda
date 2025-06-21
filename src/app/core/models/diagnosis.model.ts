export interface Diagnosis {
  details: string;
  prescriptions?: string[];
  observations?: string;  
  date: Date;
}
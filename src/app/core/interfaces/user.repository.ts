import { Patient, Specialist } from '../models';

export interface UserRepository {
  createUser(user: Patient | Specialist): Promise<void>;
  dniExists(dni: string): Promise<boolean>;
}

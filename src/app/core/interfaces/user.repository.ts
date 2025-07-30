import { Patient, Specialist, UserBase } from '../models';

export interface UserRepository {
  createUser(user: Patient | Specialist): Promise<void>;
  dniExists(dni: string): Promise<boolean>;
  getUserById(id: string): Promise<UserBase | null>;
  getUserByUId(uid: string): Promise<UserBase | null>;
  getUsersByRole(role: string): Promise<UserBase[]>;
  updateUser(updatedData: Partial<Patient | Specialist>): Promise<void>;
}

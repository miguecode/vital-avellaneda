import { Specialty } from '../models';

export interface SpecialtyRepository {
  getAll(): Promise<Specialty[]>;
  getById(id: string): Promise<Specialty | null>;
  create(specialty: Specialty): Promise<void>;
  update(specialty: Specialty): Promise<void>;
  delete(id: string): Promise<void>;
}

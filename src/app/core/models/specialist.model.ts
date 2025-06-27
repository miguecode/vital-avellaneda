import { UserBase, Specialty, Availability } from '../models';

export interface Specialist extends UserBase {
  specialty: Specialty[];
  availability: Availability[];
}

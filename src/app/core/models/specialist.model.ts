import { UserBase, Specialty, Availability } from '../models';

export interface Specialist extends UserBase {
  specialties: Specialty[];
  availability: Availability[];
  availabilityName: string; // From "AVAILABILITY_PRESETS_OPTIONS"
}

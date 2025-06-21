import { UserStatus, UserRoles } from '../enums';

export interface UserBase {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  dni: string;
  email: string;
  birthDate: Date;
  phone?: string;
  profilePictureUrl: string;
  password?: string;
  registrationDate: Date;
  rol: UserRoles;
  status: UserStatus;
}
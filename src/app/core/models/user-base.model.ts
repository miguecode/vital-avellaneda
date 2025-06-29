import { UserStatus, UserRoles, Sex } from '../enums';

export interface UserBase {
  id: string;
  firstName: string;
  lastName: string;
  dni: string;
  sex: Sex;
  birthDate: Date;
  email: string;
  password?: string;
  phone?: string;
  profilePictureUrl: string;
  registrationDate: Date;
  rol: UserRoles;
  status: UserStatus;
}
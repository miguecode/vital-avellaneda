import { UserBase } from "../models";

export interface AuthRepository {
  register(email: string, password: string): Promise<void | string>;
  login(email: string, password: string): Promise<void>;
  logout(): Promise<void>;
  isAuthenticated(): Promise<boolean>;
  getCurrentUser(): Promise<UserBase| null>;
}

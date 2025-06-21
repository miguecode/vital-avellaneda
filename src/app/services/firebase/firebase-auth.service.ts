import { Injectable, inject } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from '@angular/fire/auth';

import { AuthRepository } from '../../core/interfaces/auth.repository';
import { UserBase } from '../../core/models';
import { UserStatus, UserRoles } from '../../core/enums/';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService implements AuthRepository {
  private auth: Auth = inject(Auth);

  async register(email: string, password: string): Promise<void> {
    await createUserWithEmailAndPassword(this.auth, email, password);
  }

  async login(email: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(this.auth, email, password);
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
  }

  async isAuthenticated(): Promise<boolean> {
    return new Promise((resolve) => {
      onAuthStateChanged(this.auth, (user: FirebaseUser | null) => {
        resolve(!!user);
      });
    });
  }

  async getCurrentUser(): Promise<UserBase | null> {
    return new Promise((resolve) => {
      onAuthStateChanged(this.auth, (user: FirebaseUser | null) => {
        if (!user) return resolve(null);

        const userBase: UserBase = {
          id: user.uid,
          firstName: '',
          lastName: '',
          age: 0,
          dni: '',
          email: user.email || '',
          birthDate: new Date(),
          profilePictureUrl: user.photoURL || '',
          registrationDate: new Date(user.metadata.creationTime || Date.now()),
          rol: UserRoles.USER,
          status: UserStatus.ACTIVE,
        };

        resolve(userBase);
      });
    });
  }
}

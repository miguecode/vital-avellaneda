import { Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';
import { UserRepository } from '../../../app/core/interfaces/user.repository';
import { Patient, Specialist } from '../../core/models';

@Injectable({ providedIn: 'root' })
export class FirebaseUserService implements UserRepository {
  private firestore = inject(Firestore);

  async createUser(user: Patient | Specialist): Promise<void> {
    const userRef = doc(collection(this.firestore, 'users'), user.id);
    await setDoc(userRef, user);
  }
}

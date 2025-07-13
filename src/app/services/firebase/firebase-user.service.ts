import { Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, getDocs, query, setDoc, where } from '@angular/fire/firestore';
import { UserRepository } from '../../../app/core/interfaces/user.repository';
import { Patient, Specialist } from '../../core/models';
import { UserBase } from '../../core/models';

@Injectable({ providedIn: 'root' })
export class FirebaseUserService implements UserRepository {
  private firestore = inject(Firestore);

  async createUser(user: Patient | Specialist): Promise<void> {
    const userRef = doc(collection(this.firestore, 'users'), user.id);
    await setDoc(userRef, user);
  }

  async dniExists(dni: string): Promise<boolean> {
    const q = query(collection(this.firestore, 'users'), where('dni', '==', dni));
    const snapshot = await getDocs(q);
    return !snapshot.empty;
  }

  async getUserById(uid: string): Promise<UserBase | null> {
    const userRef = doc(this.firestore, 'users', uid);
    const userSnap = await getDocs(query(collection(this.firestore, 'users'), where('id', '==', uid)));
    if (!userSnap.empty) {
      const data = userSnap.docs[0].data();
      return {
        ...data,
        birthDate: data['birthDate'] ? new Date(data['birthDate']) : new Date(),
        registrationDate: data['registrationDate'] ? new Date(data['registrationDate']) : new Date(),
      } as UserBase;
    }
    return null;
  }
}

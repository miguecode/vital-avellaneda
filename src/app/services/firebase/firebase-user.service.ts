import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  setDoc,
  where,
  updateDoc,
} from '@angular/fire/firestore';
import { UserRepository } from '../../../app/core/interfaces/user.repository';
import { Patient, Specialist } from '../../core/models';
import { UserBase } from '../../core/models';

@Injectable({ providedIn: 'root' })
export class FirebaseUserService implements UserRepository {
  private firestore = inject(Firestore);

  async createUser(user: Patient | Specialist): Promise<void> {
    const defaultProfilePictureUrl = 'https://res.cloudinary.com/dsd1komi4/image/upload/v1755811833/default-profile_qzf9ga.png';

    const userWithProfilePicture: Patient | Specialist = {
      ...user,
      profilePictureUrl: user.profilePictureUrl || defaultProfilePictureUrl,
    };

    const userRef = doc(collection(this.firestore, 'users'), userWithProfilePicture.id);
    await setDoc(userRef, userWithProfilePicture);
  }

  async dniExists(dni: string): Promise<boolean> {
    const q = query(
      collection(this.firestore, 'users'),
      where('dni', '==', dni)
    );
    const snapshot = await getDocs(q);
    return !snapshot.empty;
  }

  async getUserByUId(uid: string): Promise<UserBase | null> {
    const userRef = doc(this.firestore, 'users', uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const data = userSnap.data();
      return {
        ...data,
        birthDate: data['birthDate'] ? new Date(data['birthDate']) : null,
        registrationDate: data['registrationDate']?.toDate() || null,
      } as UserBase;
    }
    return null;
  }

  async getUserById(id: string): Promise<UserBase | null> {
    const q = query(collection(this.firestore, 'users'), where('id', '==', id));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const docSnap = snapshot.docs[0];
      const data = docSnap.data();
      return {
        ...data,
        birthDate: data['birthDate'] ? new Date(data['birthDate']) : null,
        registrationDate: data['registrationDate']?.toDate() || null,
      } as UserBase;
    }
    return null;
  }

  async getUsersByIds(ids: string[]): Promise<UserBase[]> {
    if (ids.length === 0) {
      return [];
    }
    const usersCol = collection(this.firestore, 'users');
    const q = query(usersCol, where('id', 'in', ids));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        ...data,
        birthDate: data['birthDate'] ? new Date(data['birthDate']) : null,
        registrationDate: data['registrationDate']?.toDate() || null,
      } as UserBase;
    });
  }

  async getUsersByRole(role: string): Promise<UserBase[]> {
    const q = query(
      collection(this.firestore, 'users'),
      where('role', '==', role)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        ...data,
        birthDate: data['birthDate'] ? new Date(data['birthDate']) : null,
        registrationDate: data['registrationDate']?.toDate() || null,
      } as UserBase;
    });
  }

  async updateUser(updatedData: Partial<Patient | Specialist>): Promise<void> {
    if (!updatedData.id) {
      throw new Error(
        'El campo "id" es obligatorio para actualizar un usuario.'
      );
    }

    const q = query(
      collection(this.firestore, 'users'),
      where('id', '==', updatedData.id)
    );
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      throw new Error(`No se encontró un usuario con el ID: ${updatedData.id}`);
    }

    const userDoc = snapshot.docs[0].ref;
    await updateDoc(userDoc, updatedData);
  }
}
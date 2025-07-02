import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import { Specialty } from '../../core/models';
import { SpecialtyRepository } from '../../core/interfaces/specialty.repository';

@Injectable({
  providedIn: 'root',
})
export class FirebaseSpecialtyService implements SpecialtyRepository {
  private firestore: Firestore = inject(Firestore);
  private collectionName = 'specialties';

  async getAll(): Promise<Specialty[]> {
    const snapshot = await getDocs(
      collection(this.firestore, this.collectionName)
    );
    return snapshot.docs.map((doc) => doc.data() as Specialty);
  }

  async getById(id: string): Promise<Specialty | null> {
    const ref = doc(this.firestore, this.collectionName, id);
    const snapshot = await getDoc(ref);
    return snapshot.exists() ? (snapshot.data() as Specialty) : null;
  }

  async create(specialty: Specialty): Promise<void> {
    const ref = doc(this.firestore, this.collectionName, specialty.id);
    await setDoc(ref, specialty);
  }

  async update(specialty: Specialty): Promise<void> {
    const ref = doc(this.firestore, this.collectionName, specialty.id);
    await setDoc(ref, specialty, { merge: true });
  }

  async delete(id: string): Promise<void> {
    const ref = doc(this.firestore, this.collectionName, id);
    await deleteDoc(ref);
  }
}

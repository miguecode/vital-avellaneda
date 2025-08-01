import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { Appointment } from '../../core/models';
import { AppointmentRepository } from '../../core/interfaces/appointment.repository';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAppointmentService implements AppointmentRepository {
  private firestore: Firestore = inject(Firestore);
  private collectionName = 'appointments';

  async create(appointment: Appointment): Promise<void> {
    const appointmentRef = doc(this.firestore, this.collectionName, appointment.id);
    await setDoc(appointmentRef, appointment);
  }

  getById(id: string): Promise<Appointment | null> {
    throw new Error('Method not implemented.');
  }
  update(appointment: Partial<Appointment>): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
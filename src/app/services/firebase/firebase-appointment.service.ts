import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  query,
  where,
  orderBy,
} from '@angular/fire/firestore';
import { Appointment } from '../../core/models';
import { AppointmentRepository } from '../../core/interfaces/appointment.repository';
import { AppointmentStatus } from '../../core/enums';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAppointmentService implements AppointmentRepository {
  private firestore: Firestore = inject(Firestore);
  private collectionName = 'appointments';

  async create(appointment: Appointment): Promise<void> {
    const appointmentRef = doc(
      this.firestore,
      this.collectionName,
      appointment.id
    );
    await setDoc(appointmentRef, appointment);
  }

  async getById(id: string): Promise<Appointment | null> {
    const appointmentRef = doc(this.firestore, this.collectionName, id);
    const docSnap = await getDoc(appointmentRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        ...data,
        date: data['date']?.toDate() || null,
        creationDate: data['creationDate']?.toDate() || null,
      } as Appointment;
    }
    return null;
  }

  async update(appointment: Partial<Appointment>): Promise<void> {
    if (!appointment.id) {
      throw new Error('El ID del turno es requerido para actualizarlo.');
    }
    const appointmentRef = doc(
      this.firestore,
      this.collectionName,
      appointment.id
    );
    await updateDoc(appointmentRef, appointment);
  }

  private async getAppointmentsByField(
    fieldName: 'patientId' | 'specialistId',
    id: string
  ): Promise<Appointment[]> {
    const appointmentsCol = collection(this.firestore, this.collectionName);
    const q = query(
      appointmentsCol,
      where(fieldName, '==', id),
      orderBy('date', 'asc')
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        ...data,
        date: data['date']?.toDate() || null,
        creationDate: data['creationDate']?.toDate() || null,
      } as Appointment;
    });
  }

  async getForPatient(patientId: string): Promise<Appointment[]> {
    return this.getAppointmentsByField('patientId', patientId);
  }

  async getForSpecialist(specialistId: string): Promise<Appointment[]> {
    return this.getAppointmentsByField('specialistId', specialistId);
  }

  async getCompletedForPatient(patientId: string): Promise<Appointment[]> {
    const appointmentsCol = collection(this.firestore, this.collectionName);
    const q = query(
      appointmentsCol,
      where('patientId', '==', patientId),
      where('status', '==', AppointmentStatus.COMPLETED),
      orderBy('date', 'desc')
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        date: data['date']?.toDate() || null,
        creationDate: data['creationDate']?.toDate() || null,
      } as Appointment;
    });
  }
}
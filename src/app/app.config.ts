// Angular Application imports
import {
  ApplicationConfig,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
  inject,
  LOCALE_ID,
} from '@angular/core';


// Angular Router imports
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

// Platform Browser imports
import {
  provideClientHydration,
  withEventReplay,
  withIncrementalHydration,
} from '@angular/platform-browser';

// Language Configuration
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs, 'es');

// Firebase imports
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore } from '@angular/fire/firestore';
import { getFirestore } from 'firebase/firestore';

// Environment import
import { environment } from '../environments/environment';

// Core interfaces and services imports
import { AUTH_REPOSITORY } from './core/interfaces/auth.repository.token';
import { USER_REPOSITORY } from './core/interfaces/user.repository.token';
import { SPECIALTY_REPOSITORY } from './core/interfaces/specialty.repository.token';
import { APPOINTMENT_REPOSITORY } from './core/interfaces/appointment.repository.token';
import { FirebaseAuthService } from './services/firebase/firebase-auth.service';
import { FirebaseUserService } from './services/firebase/firebase-user.service';
import { FirebaseSpecialtyService } from './services/firebase/firebase-specialty.service';
import { FirebaseAppointmentService } from './services/firebase/firebase-appointment.service';
import { AuthFacade } from './features/auth/auth.facade';

export const appConfig: ApplicationConfig = {
  providers: [
    // Initialize App checking auth status
    provideAppInitializer(() => inject(AuthFacade).checkAuthStatus()),

    // Core Angular providers
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withIncrementalHydration(), withEventReplay()),

    // Firebase configuration and services
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),

    // Service providers
    { provide: AUTH_REPOSITORY, useClass: FirebaseAuthService },
    { provide: USER_REPOSITORY, useClass: FirebaseUserService },
    { provide: SPECIALTY_REPOSITORY, useClass: FirebaseSpecialtyService },
    { provide: APPOINTMENT_REPOSITORY, useClass: FirebaseAppointmentService },

    // Language provide
    { provide: LOCALE_ID, useValue: 'es' },
  ],
};

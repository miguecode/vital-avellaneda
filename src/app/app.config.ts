// Angular Application imports
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
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

// Firebase imports
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';

// Environment import
import { environment } from '../environments/environment';

// Core interfaces and services imports
import { AUTH_REPOSITORY } from './core/interfaces/auth.repository.token';
import { SPECIALTY_REPOSITORY } from './core/interfaces/specialty.repository.token';
import { FirebaseAuthService } from './services/firebase/firebase-auth.service';
import { FirebaseSpecialtyService } from './services/firebase/firebase-specialty.service';
import { provideFirestore } from '@angular/fire/firestore';
import { getFirestore } from 'firebase/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    // Core Angular providers
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withIncrementalHydration(), withEventReplay()),

    // Firebase configuration and services
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),

    // Custom providers
    // This is where we provide our AuthRepository implementation
    { provide: AUTH_REPOSITORY, useClass: FirebaseAuthService },
    { provide: SPECIALTY_REPOSITORY, useClass: FirebaseSpecialtyService },
  ],
};

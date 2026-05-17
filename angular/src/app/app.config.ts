import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import {
  provideFirestore,
  getFirestore,
  connectFirestoreEmulator
} from '@angular/fire/firestore';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { routes } from './app.routes';
import { environment } from '../environments/environment';

/**
 * Configuración principal de la aplicación Angular.
 *
 * En modo de desarrollo se permite conectar Firestore al emulador local
 * de Firebase para poder probar las Cloud Functions sin desplegarlas en
 * Firebase real, evitando así depender del plan Blaze.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),

    provideFirebaseApp(() => initializeApp(environment.firebase)),

    provideFirestore(() => {
      const firestore = getFirestore();

      if (environment.useEmulators) {
        connectFirestoreEmulator(firestore, 'localhost', 8080);
      }

      return firestore;
    }),

    provideMessaging(() => getMessaging())
  ]
};
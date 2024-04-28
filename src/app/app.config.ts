import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { MessageService } from 'primeng/api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    MessageService,


    provideAnimations(),
    importProvidersFrom(provideFirebaseApp(() => initializeApp(
      {
        "projectId": "gamesroom-73654",
        "appId": "1:65820161965:web:20144b56a236c02b705324",
        "storageBucket": "gamesroom-73654.appspot.com",
        "apiKey": "AIzaSyDPXIL9TAREToE5-6nfO9FSOib-CuWChwo",
        "authDomain": "gamesroom-73654.firebaseapp.com",
        "messagingSenderId": "65820161965"
      }))),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore()))
  ]
};

import { Injectable } from '@angular/core';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { initializeApp } from 'firebase/app';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  private app = initializeApp(environment.firebase);
  private messaging = getMessaging(this.app);

  async requestPermission(): Promise<void> {
    try {
      const permission = await Notification.requestPermission();

      if (permission === 'granted') {
        const token = await getToken(this.messaging, {
          vapidKey: 'BC7a_Ln5EIXP9Y8YtfaS0P8TyuVVCCAWBoJvBrjt7sP2uM1BVoXU7YZWGhl2SUZtuO64olkQca5cCuYWXvljuNE'
        });

        console.log('Token FCM web:', token);
      } else {
        console.log('Permiso de notificaciones denegado');
      }
    } catch (error) {
      console.error('Error al obtener token FCM:', error);
    }
  }

  listenMessages(): void {
    onMessage(this.messaging, (payload) => {
      console.log('Mensaje recibido en primer plano:', payload);
    });
  }
}
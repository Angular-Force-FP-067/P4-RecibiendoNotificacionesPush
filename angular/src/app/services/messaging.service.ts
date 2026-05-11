import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage, Messaging } from 'firebase/messaging';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  private app = initializeApp(environment.firebase);
  private messaging: Messaging = getMessaging(this.app);

  async requestPermission(): Promise<void> {
    try {
      const permission = await Notification.requestPermission();

      if (permission !== 'granted') {
        console.log('Permiso de notificaciones denegado o no concedido:', permission);
        return;
      }

      const token = await getToken(this.messaging, {
        vapidKey: environment.vapidKey
      });

      if (token) {
        console.log('Token FCM web:', token);
      } else {
        console.warn('No se ha podido obtener el token FCM.');
      }

    } catch (error) {
      console.error('Error al solicitar permisos u obtener token FCM:', error);
    }
  }

  listenMessages(): void {
    onMessage(this.messaging, (payload) => {
      console.log('Mensaje recibido en primer plano:', payload);

      const title = payload.notification?.title || 'Nueva notificación';
      const body = payload.notification?.body || 'Has recibido una nueva notificación.';

      alert(`${title}\n\n${body}`);
    });
  }
}
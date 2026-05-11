import { Injectable, inject } from '@angular/core';
import { Messaging, getToken, onMessage } from '@angular/fire/messaging';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseMessagingService {

  private messaging = inject(Messaging);

  /**
   * Solicita permisos al navegador y obtiene el token FCM del usuario.
   */
  async requestPermissionAndGetToken(): Promise<string | null> {
    try {
      const permission = await Notification.requestPermission();

      if (permission !== 'granted') {
        console.warn('Permiso de notificaciones no concedido:', permission);
        return null;
      }

      const token = await getToken(this.messaging, {
        vapidKey: environment.vapidKey
      });

      if (token) {
        console.log('Token FCM obtenido:', token);
        return token;
      }

      console.warn('No se ha podido obtener el token FCM.');
      return null;

    } catch (error) {
      console.error('Error al solicitar permisos u obtener el token FCM:', error);
      return null;
    }
  }

  /**
   * Escucha mensajes recibidos cuando la aplicación está abierta en primer plano.
   */
  listenForegroundMessages(): void {
    onMessage(this.messaging, (payload) => {
      console.log('Mensaje recibido en primer plano:', payload);

      const title = payload.notification?.title || 'Nueva notificación';
      const body = payload.notification?.body || 'Has recibido una notificación.';

      alert(`${title}\n\n${body}`);
    });
  }
}
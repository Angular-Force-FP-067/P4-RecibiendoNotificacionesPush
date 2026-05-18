import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  onSnapshot,
  query,
  orderBy,
  limit
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class NotificationListenerService {

  constructor(private firestore: Firestore) {}

  /**
   * Escucha en tiempo real las notificaciones internas generadas
   * por las Cloud Functions emuladas.
   */
  escucharNotificaciones(): void {
    const notificationsRef = collection(this.firestore, 'notifications_log');

    const q = query(
      notificationsRef,
      orderBy('fecha', 'desc'),
      limit(1)
    );

    onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const data = change.doc.data();

          const titulo = data['titulo'] ?? 'Notificación';
          const mensaje = data['mensaje'] ?? 'Se ha detectado un cambio.';

          alert(`${titulo}\n\n${mensaje}`);
        }
      });
    });
  }
}
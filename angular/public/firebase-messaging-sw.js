importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyABYM2MvAOC3WQDA9-g9Q_8ozAefluDu48',
  authDomain: 'equipo-basket-e20b9.firebaseapp.com',
  projectId: 'equipo-basket-e20b9',
  storageBucket: 'equipo-basket-e20b9.firebasestorage.app',
  messagingSenderId: '704239206516',
  appId: '1:704239206516:web:1a4d79a7f147795dab9121',
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Mensaje recibido en background:', payload);

  const notificationTitle = payload.notification?.title || 'Nueva notificación';

  const notificationOptions = {
    body: payload.notification?.body || 'Tienes una nueva notificación.',
    icon: '/favicon.ico',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

import React, { useEffect } from 'react';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';

import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  useEffect(() => {
    const configurarNotificaciones = async () => {
      try {
        if (Platform.OS === 'android' && Platform.Version >= 33) {
          await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
          );
        }

        const authStatus = await messaging().requestPermission();
        console.log('Estado permisos Firebase:', authStatus);

        const token = await messaging().getToken();
        console.log('TOKEN FCM:', token);
      } catch (error) {
        console.log('Error configurando notificaciones:', error);
      }
    };

    configurarNotificaciones();

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('Notificación:', remoteMessage);

      Alert.alert(
        remoteMessage.notification?.title || 'Nueva notificación',
        remoteMessage.notification?.body || 'Has recibido una notificación'
      );
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('Notificación con la app en segundo plano:', remoteMessage);
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log('App abierta desde notificación:', remoteMessage);
        }
      });

    return unsubscribe;
  }, []);

  return <AppNavigator />;
}
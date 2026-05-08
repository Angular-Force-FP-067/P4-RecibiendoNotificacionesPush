import { Platform } from 'react-native';

let firestore;

if (Platform.OS === 'web') {
  const { initializeApp, getApps } = require('firebase/app');
  const { getFirestore, collection, getDocs } = require('firebase/firestore');

  const firebaseConfig = {
    apiKey: "AIzaSyABYM2MvAOC3WQDA9-g9Q_8ozAefluDu48",
    authDomain: "equipo-basket-e20b9.firebaseapp.com",
    databaseURL: "https://equipo-basket-e20b9-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "equipo-basket-e20b9",
    storageBucket: "equipo-basket-e20b9.firebasestorage.app",
    messagingSenderId: "704239206516",
    appId: "1:704239206516:web:1a4d79a7f147795dab9121"
  };

  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  const db = getFirestore(app);

  // Mimic the react-native-firebase API so PlayerScreen.js doesn't need changes
  firestore = () => ({
    collection: (name) => ({
      get: async () => {
        const snapshot = await getDocs(collection(db, name));
        return {
          docs: snapshot.docs.map((doc) => ({
            id: doc.id,
            data: () => doc.data(),
          })),
        };
      },
    }),
  });
} else {
  firestore = require('@react-native-firebase/firestore').default;
}

export { firestore };
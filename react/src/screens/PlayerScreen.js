import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { firestore } from '../services/firebase';
import styles from './PlayerScreen.style';

const getPosicioStyle = (posicion) => {
  switch (posicion?.toLowerCase()) {
    case 'base':
      return { bg: '#2077F9', text: '#fff' };
    case 'escolta':
      return { bg: '#005D06', text: '#fff' };
    case 'alero':
      return { bg: '#F1ACFF', text: '#222' };
    case 'ala-pívot':
    case 'ala-pivot':
      return { bg: '#FCFFAC', text: '#222' };
    case 'pívot':
    case 'pivot':
      return { bg: '#dc3545', text: '#fff' };
    default:
      return { bg: '#ccc', text: '#333' };
  }
};

export default function PlayerScreen({ navigation }) {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPlayers = async () => {
      try {
        const snapshot = await firestore().collection('players').get();
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          firebaseKey: doc.id,
          ...doc.data(),
        }));
        setPlayers(data);
      } catch (error) {
        console.error('Error loading players:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPlayers();
  }, []);

  const renderItem = ({ item }) => {
    const posStyle = getPosicioStyle(item.posicion);
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Detalle', { player: item })}
      >
        <Text style={styles.numero}>#{item.numejersey}</Text>
        <View style={styles.info}>
          <Text style={styles.nombre}>{item.nombre} {item.apellidos}</Text>
          <View style={[styles.posicionBadge, { backgroundColor: posStyle.bg }]}>
            <Text style={[styles.posicionText, { color: posStyle.text }]}>
              {item.posicion}
            </Text>
          </View>
          <Text style={styles.pais}>{item.pais}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FF4400" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Equipo Basket 🏀</Text>
      </View>
      <FlatList
        data={players}
        keyExtractor={(item, index) => String(item.id ?? item.firebaseKey ?? index)}
        renderItem={renderItem}
      />
    </View>
  );
}
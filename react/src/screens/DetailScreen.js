import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import Player from '../components/Player';
import styles from './DetailScreen.styles';

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

const isRemoteUrl = (value) => {
  return typeof value === 'string' && (value.startsWith('http://') || value.startsWith('https://'));
};

export default function DetailScreen({ route }) {
  const player = route?.params?.player;

  if (!player) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>No se ha recibido información del jugador.</Text>
      </View>
    );
  }

  const nombreCompleto = `${player.nombre ?? ''} ${player.apellidos ?? ''}`.trim() || 'Jugador';

  const posStyle = getPosicioStyle(player.posicion);
  const hasRemoteImage = isRemoteUrl(player.imagen);
  const videoSource =
    player.videoURL ||
    player.videoUrl ||
    player.video ||
    player.video_link ||
    '';
  const hasVideoPath = typeof videoSource === 'string' && videoSource.trim() !== '';

  const stats = [
    { label: 'PPP', value: player.PPP },
    { label: 'APP', value: player.APP },
    { label: 'RPP', value: player.RPP },
    { label: 'TC %', value: player.TirosCampo },
  ];

  const personalData = [
    { label: 'Nombre', value: player.nombre },
    { label: 'Apellidos', value: player.apellidos },
    { label: 'País', value: player.pais },
    { label: 'Posición', value: player.posicion },
    { label: 'Dorsal', value: player.numejersey },
    { label: 'Edad', value: player.edad },
    { label: 'Altura', value: player.altura ? `${player.altura} cm` : null },
    { label: 'Peso', value: player.peso ? `${player.peso} kg` : null },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.headerCard}>
        <Text style={styles.dorsal}>#{player.numejersey ?? '—'}</Text>
        <Text style={styles.name}>{nombreCompleto}</Text>

        <View style={[styles.positionBadge, { backgroundColor: posStyle.bg }]}>
          <Text style={[styles.positionText, { color: posStyle.text }]}>{player.posicion ?? 'No disponible'}</Text>
        </View>

        <Text style={styles.country}>{player.pais ?? 'No disponible'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Fotografía</Text>

        {hasRemoteImage ? (
          <Image source={{ uri: player.imagen }} style={styles.image} resizeMode="cover" />
        ) : (
          <View style={styles.placeholderBox}>
            <Text style={styles.placeholderTitle}>Espacio reservado para la fotografía</Text>
            {player.imagen ? <Text style={styles.mediaPath}>Ruta actual: {player.imagen}</Text> : <Text style={styles.mediaPath}>Sin ruta de imagen</Text>}
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Estadísticas</Text>

        <View style={styles.statsGrid}>
          {stats.map((stat) => (
            <View key={stat.label} style={styles.statCard}>
              <Text style={styles.statLabel}>{stat.label}</Text>
              <Text style={styles.statValue}>{stat.value !== undefined && stat.value !== null && stat.value !== '' ? String(stat.value) : '—'}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Datos del jugador</Text>

        {personalData.map((item) => (
          <View key={item.label} style={styles.infoRow}>
            <Text style={styles.infoLabel}>{item.label}</Text>
            <Text style={styles.infoValue}>{item.value !== undefined && item.value !== null && item.value !== '' ? String(item.value) : 'No disponible'}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Biografía</Text>
        <Text style={styles.bioText}>{player.biografia && player.biografia.trim() !== '' ? player.biografia : 'No disponible'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Vídeo Resumen / Mejores Jugadas</Text>
        {hasVideoPath ? (
          <Player
            sourceUri={videoSource}
            posterUri={hasRemoteImage ? player.imagen : undefined}
          />
        ) : (
          <View style={styles.placeholderBox}>
            <Text style={styles.placeholderTitle}>Espacio reservado para el vídeo</Text>
            <Text style={styles.mediaPath}>Sin ruta de vídeo</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

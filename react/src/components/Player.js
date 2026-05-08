import React, { useMemo, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import styles from './Player.styles';

const formatTime = (millis) => {
  if (!millis && millis !== 0) {
    return '0:00';
  }

  const totalSeconds = Math.floor(millis / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export default function Player({ sourceUri, posterUri, title, subtitle }) {
  const videoRef = useRef(null);
  const [status, setStatus] = useState({
    isLoaded: false,
    isPlaying: false,
    durationMillis: 0,
    positionMillis: 0,
    isMuted: false,
    error: null,
  });

  const progressRatio = useMemo(() => {
    if (!status.durationMillis) {
      return 0;
    }
    return Math.min(1, status.positionMillis / status.durationMillis);
  }, [status.durationMillis, status.positionMillis]);

  const handleStatusUpdate = (nextStatus) => {
    if (!nextStatus.isLoaded) {
      setStatus((prev) => ({
        ...prev,
        isLoaded: false,
        isPlaying: false,
        error: nextStatus.error ?? null,
      }));
      return;
    }

    setStatus((prev) => ({
      ...prev,
      isLoaded: true,
      isPlaying: nextStatus.isPlaying,
      durationMillis: nextStatus.durationMillis ?? 0,
      positionMillis: nextStatus.positionMillis ?? 0,
      isMuted: nextStatus.isMuted ?? false,
      error: null,
    }));
  };

  const togglePlay = async () => {
    if (!videoRef.current) {
      return;
    }

    const current = await videoRef.current.getStatusAsync();
    if (!current.isLoaded) {
      return;
    }

    if (current.isPlaying) {
      await videoRef.current.pauseAsync();
    } else {
      await videoRef.current.playAsync();
    }
  };

  const skipBy = async (deltaMillis) => {
    if (!videoRef.current) {
      return;
    }

    const current = await videoRef.current.getStatusAsync();
    if (!current.isLoaded) {
      return;
    }

    const duration = current.durationMillis ?? 0;
    const nextPosition = Math.max(0, Math.min(current.positionMillis + deltaMillis, duration));
    await videoRef.current.setPositionAsync(nextPosition);
  };

  const restart = async () => {
    if (!videoRef.current) {
      return;
    }

    const current = await videoRef.current.getStatusAsync();
    if (!current.isLoaded) {
      return;
    }

    await videoRef.current.setPositionAsync(0);
    await videoRef.current.playAsync();
  };

  const toggleMute = async () => {
    if (!videoRef.current) {
      return;
    }

    const current = await videoRef.current.getStatusAsync();
    if (!current.isLoaded) {
      return;
    }

    await videoRef.current.setIsMutedAsync(!current.isMuted);
  };

  if (!sourceUri) {
    return (
      <View style={styles.placeholderBox}>
        <Text style={styles.placeholderTitle}>Sin fuente de video disponible</Text>
        <Text style={styles.placeholderText}>Agrega una URL valida para visualizar el reproductor.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {title || subtitle ? (
        <View style={styles.header}>
          {title ? <Text style={styles.title}>{title}</Text> : null}
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
      ) : null}

      <View style={styles.videoFrame}>
        <Video
          ref={videoRef}
          style={styles.video}
          source={{ uri: sourceUri }}
          posterSource={posterUri ? { uri: posterUri } : undefined}
          posterStyle={styles.video}
          resizeMode={ResizeMode.COVER}
          useNativeControls={false}
          onPlaybackStatusUpdate={handleStatusUpdate}
        />

        {!status.isLoaded && !status.error ? (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="small" color="#fff" />
            <Text style={styles.loadingText}>Cargando video...</Text>
          </View>
        ) : null}

        {status.error ? (
          <View style={styles.loadingOverlay}>
            <Text style={styles.loadingText}>No se pudo cargar el video.</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.controls}>
        <View style={styles.progressRow}>
          <Text style={styles.timeText}>{formatTime(status.positionMillis)}</Text>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progressRatio * 100}%` }]} />
          </View>
          <Text style={styles.timeText}>{formatTime(status.durationMillis)}</Text>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.smallButton} onPress={() => skipBy(-10000)}>
            <Text style={styles.buttonText}>-10s</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mainButton} onPress={togglePlay}>
            <Text style={styles.mainButtonText}>{status.isPlaying ? 'Pausa' : 'Play'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.smallButton} onPress={() => skipBy(10000)}>
            <Text style={styles.buttonText}>+10s</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.secondaryButton} onPress={restart}>
            <Text style={styles.buttonText}>Reiniciar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={toggleMute}>
            <Text style={styles.buttonText}>{status.isMuted ? 'Activar sonido' : 'Silenciar'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import styles from './HomeScreen.styles';

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>

      {/* Hero */}
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>🏀 Equipo Basket</Text>
        <Text style={styles.heroSub}>Un portal pensado para conocer a los jugadores</Text>
      </View>

      {/* Feature cards */}
      <View style={styles.featuresSection}>
        <View style={styles.featureCard}>
          <Text style={styles.featureIcon}>🏀</Text>
          <Text style={styles.featureTitle}>Conoce a los jugadores</Text>
          <Text style={styles.featureText}>
            Accede a los perfiles de jugador y descubre la información más importante de forma visual y ordenada.
          </Text>
        </View>

        <View style={styles.featureCard}>
          <Text style={styles.featureIcon}>🎥</Text>
          <Text style={styles.featureTitle}>Observa sus jugadas</Text>
          <Text style={styles.featureText}>
            Explora highlights y mejores momentos para entender el estilo de juego y el impacto de cada jugador en la pista.
          </Text>
        </View>

        <View style={styles.featureCard}>
          <Text style={styles.featureIcon}>📊</Text>
          <Text style={styles.featureTitle}>Consulta sus medias</Text>
          <Text style={styles.featureText}>
            Revisa estadísticas, rendimiento, biografía y datos relevantes de manera rápida, limpia y fácil de comparar.
          </Text>
        </View>
      </View>

      {/* CTA */}
      <TouchableOpacity style={styles.ctaBtn} onPress={() => navigation.navigate('Players')}>
        <Text style={styles.ctaBtnText}>Ver jugadores →</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}
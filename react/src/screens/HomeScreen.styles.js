import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9E9E9',
  },

  // Hero
  hero: {
    backgroundColor: '#FF4400',
    alignItems: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  heroSub: {
    fontSize: 14,
    color: '#ffffffcc',
    textAlign: 'center',
  },

  // Feature cards
  featuresSection: {
    padding: 16,
    gap: 12,
  },
  featureCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  featureIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 6,
  },
  featureText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
  },

  // Info block
  infoBlock: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  infoText: {
    marginBottom: 20,
  },
  sectionTag: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FF4400',
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 10,
    lineHeight: 26,
  },
  infoDesc: {
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#FFF3EE',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF440022',
  },
  statLabel: {
    fontSize: 11,
    color: '#FF4400',
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  statValue: {
    fontSize: 11,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
  },

  // CTA
  ctaBtn: {
    backgroundColor: '#FF4400',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    margin: 16,
    marginTop: 4,
    marginBottom: 32,
  },
  ctaBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
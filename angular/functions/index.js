// ─── 1. Importar módulos ───────────────────────────────────────────────
const { onDocumentWritten, onDocumentUpdated } = require('firebase-functions/v2/firestore');
const { initializeApp } = require('firebase-admin/app');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');

// ─── 2. Inicializar Firebase Admin ────────────────────────────────────
initializeApp();

const db = getFirestore();

/**
 * Registra una notificación interna en Firestore.
 *
 * Esta función auxiliar se utiliza para dejar constancia de que los triggers
 * onWrite y onUpdate se han ejecutado correctamente en el emulador local.
 *
 * En un entorno de producción, esta lógica podría sustituirse o complementarse
 * con Firebase Cloud Messaging mediante getMessaging().send().
 */
async function registrarNotificacionInterna({ tipo, titulo, mensaje, playerId, datos }) {
  const notificacion = {
    tipo,
    titulo,
    mensaje,
    playerId,
    datos,
    fecha: FieldValue.serverTimestamp(),
    leida: false,
    origen: 'functions-emulator',
  };

  await db.collection('notifications_log').add(notificacion);

  console.log('Notificación interna registrada:', notificacion);
}

// ═══════════════════════════════════════════════════════════════════════
// TRIGGER 1: onWrite() — Se dispara al CREAR, MODIFICAR o ELIMINAR
// ═══════════════════════════════════════════════════════════════════════
exports.notificarEscritura = onDocumentWritten('players/{playerId}', async (event) => {
  const playerId = event.params.playerId;

  if (!event.data.after.exists) {
    console.log('onWrite disparado: documento eliminado. No se registra notificación.');
    return null;
  }

  const nuevosDatos = event.data.after.data();

  console.log('onWrite disparado con datos:', nuevosDatos);

  await registrarNotificacionInterna({
    tipo: 'onWrite',
    titulo: 'Cambio detectado en Equipo Basket',
    mensaje: `Creado o modificado: ${nuevosDatos.nombre} ${nuevosDatos.apellidos}`,
    playerId,
    datos: nuevosDatos,
  });

  return null;
});

// ═══════════════════════════════════════════════════════════════════════
// TRIGGER 2: onUpdate() — Se dispara SOLO al MODIFICAR
// ═══════════════════════════════════════════════════════════════════════
exports.notificarActualizacion = onDocumentUpdated('players/{playerId}', async (event) => {
  const playerId = event.params.playerId;

  const datosPrevios = event.data.before.data();
  const datosNuevos = event.data.after.data();

  console.log('onUpdate — antes:', datosPrevios);
  console.log('onUpdate — después:', datosNuevos);

  await registrarNotificacionInterna({
    tipo: 'onUpdate',
    titulo: 'Jugador actualizado en Equipo Basket',
    mensaje: `Cambio detectado: ${datosNuevos.nombre} ${datosNuevos.apellidos}`,
    playerId,
    datos: {
      antes: datosPrevios,
      despues: datosNuevos,
    },
  });

  return null;
});

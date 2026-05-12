// ─── 1. Importar módulos ───────────────────────────────────────────────
const { onDocumentWritten, onDocumentUpdated } = require("firebase-functions/v2/firestore");
const { initializeApp } = require("firebase-admin/app");
const { getMessaging } = require("firebase-admin/messaging");

// ─── 2. Inicializar Firebase Admin ────────────────────────────────────
initializeApp();

// ═══════════════════════════════════════════════════════════════════════
// TRIGGER 1: onWrite() — Se dispara al CREAR o MODIFICAR un documento
// ═══════════════════════════════════════════════════════════════════════
exports.notificarEscritura = onDocumentWritten(
  "players/{playerId}",
  async (event) => {

    if (!event.data.after.exists) {
      console.log("Documento eliminado, sin notificación.");
      return null;
    }

    const nuevosDatos = event.data.after.data();
    console.log("onWrite disparado con datos:", nuevosDatos);

    const mensaje = {
      notification: {
        title: "¡Nuevo jugador en Equipo Basket!",
        body: `Creado o modificado: ${nuevosDatos.nombre} ${nuevosDatos.apellidos}`,
      },
      topic: "general",
    };

    try {
      const respuesta = await getMessaging().send(mensaje);
      console.log("Notificación enviada (onWrite):", respuesta);
    } catch (error) {
      console.error("Error al enviar notificación (onWrite):", error);
    }

    return null;
  }
);

// ═══════════════════════════════════════════════════════════════════════
// TRIGGER 2: onUpdate() — Se dispara SOLO al MODIFICAR
// ═══════════════════════════════════════════════════════════════════════
exports.notificarActualizacion = onDocumentUpdated(
  "players/{playerId}",
  async (event) => {

    const datosPrevios = event.data.before.data();
    const datosNuevos = event.data.after.data();

    console.log("onUpdate — antes:", datosPrevios);
    console.log("onUpdate — después:", datosNuevos);

    const mensaje = {
      notification: {
        title: "Jugador actualizado en Equipo Basket",
        body: `Cambio detectado: ${datosNuevos.nombre} ${datosNuevos.apellidos}`,
      },
      topic: "general",
    };

    try {
      const respuesta = await getMessaging().send(mensaje);
      console.log("Notificación enviada (onUpdate):", respuesta);
    } catch (error) {
      console.error("Error al enviar notificación (onUpdate):", error);
    }

    return null;
  }
);
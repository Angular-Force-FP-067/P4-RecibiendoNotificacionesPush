// ─── 1. Importar módulos ───────────────────────────────────────────────────
const { onValueWritten, onValueUpdated } = require("firebase-functions/v2/database");
const { initializeApp } = require("firebase-admin/app");
const { getMessaging } = require("firebase-admin/messaging");

// ─── 2. Inicializar Firebase Admin ────────────────────────────────────────
initializeApp();

// ═══════════════════════════════════════════════════════════════════════════
// TRIGGER 1: onWrite() — Se dispara al CREAR o MODIFICAR un registro
// ═══════════════════════════════════════════════════════════════════════════
exports.notificarEscritura = onValueWritten(
  { ref: "/mensajes/{mensajeId}", region: "europe-west1" },
  async (event) => {

    // Si el nodo fue eliminado, no hacemos nada
    if (!event.data.after.exists()) {
      console.log("Nodo eliminado, sin notificación.");
      return null;
    }

    const nuevosDatos = event.data.after.val();
    console.log("onWrite disparado con datos:", nuevosDatos);

    // Construir notificación dirigida al topic general
    const mensaje = {
      notification: {
        title: "¡Nueva entrada en Equipo Basket!",
        body: `Registro creado o modificado: ${nuevosDatos.texto || JSON.stringify(nuevosDatos)}`,
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

// ═══════════════════════════════════════════════════════════════════════════
// TRIGGER 2: onUpdate() — Se dispara SOLO al MODIFICAR (no al crear)
// ═══════════════════════════════════════════════════════════════════════════
exports.notificarActualizacion = onValueUpdated(
  { ref: "/mensajes/{mensajeId}", region: "europe-west1" },
  async (event) => {

    const datosPrevios = event.data.before.val();
    const datosNuevos = event.data.after.val();

    console.log("onUpdate — antes:", datosPrevios);
    console.log("onUpdate — después:", datosNuevos);

    const mensaje = {
      notification: {
        title: "Registro actualizado en Equipo Basket",
        body: `Cambio detectado: ${datosNuevos.texto || JSON.stringify(datosNuevos)}`,
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
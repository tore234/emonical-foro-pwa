// src/components/Bot/AutoReplyHandler.js
import { obtenerRespuestaBot } from "./ChatBotService";

export async function procesarNuevaPregunta(pregunta, agregarRespuesta) {
  const respuestaBot = await obtenerRespuestaBot(pregunta);

  agregarRespuesta({
    autor: "Emonical Bot 💫",
    contenido: respuestaBot,
    fecha: new Date().toLocaleString("es-MX"),
  });
}

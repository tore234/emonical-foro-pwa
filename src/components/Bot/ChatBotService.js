// src/components/Bot/ChatBotService.js
export async function obtenerRespuestaBot(pregunta) {
  try {
    const response = await fetch("http://localhost:5000/api/foro/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pregunta }),
    });

    const data = await response.json();
    return data.respuesta;
  } catch (error) {
    console.error("Error obteniendo respuesta del bot:", error);
    return "Lo siento 😔, hubo un problema al procesar tu pregunta. Intenta nuevamente.";
  }
}

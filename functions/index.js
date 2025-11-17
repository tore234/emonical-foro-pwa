// --- 🔹 IMPORTACIONES ---
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const fetch = require("node-fetch");

admin.initializeApp();
const db = admin.firestore();

// --- 🔹 1. Actualiza noticias automáticamente cada 24 horas ---
exports.updateNoticias = functions.pubsub
  .schedule("every 24 hours")
  .onRun(async () => {
    console.log("⏰ Ejecutando actualización de noticias Emonical...");

    try {
      // Ejemplo: usa NewsAPI (o cualquier fuente similar)
      const API_KEY = "demo"; // <-- luego aquí pondrás tu propia key
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=salud%20mental&language=es&apiKey=${API_KEY}`
      );
      const data = await response.json();

      const noticias = data.articles.slice(0, 5); // solo las primeras 5
      const batch = db.batch();
      const noticiasRef = db.collection("noticias");

      noticias.forEach((n) => {
        const docRef = noticiasRef.doc();
        batch.set(docRef, {
          titulo: n.title,
          texto: n.description || "Sin descripción.",
          autor: n.source.name || "Fuente desconocida",
          fecha: n.publishedAt || new Date().toISOString(),
        });
      });

      await batch.commit();
      console.log("✅ Noticias actualizadas correctamente.");
    } catch (error) {
      console.error("❌ Error al obtener noticias:", error);
    }
  });

// --- 🔹 2. Publica un tip emocional diario ---
exports.autoPostTip = functions.pubsub
  .schedule("every 12 hours") // se ejecuta cada 12 horas
  .onRun(async () => {
    console.log("💬 Publicando tip emocional diario...");

    const tips = [
      "Respira profundo. Tres inhalaciones lentas pueden cambiar tu día.",
      "No estás solo: compartir lo que sientes también es fortaleza.",
      "Cuida tu mente como cuidas tu cuerpo: ambos te sostienen.",
      "Un descanso a tiempo vale más que una jornada agotadora.",
      "Pequeños logros diarios construyen grandes avances.",
    ];

    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    await db.collection("posts").add({
      titulo: "✨ Tip emocional del día",
      texto: randomTip,
      autor: "Bot Emonical 🤖",
      fecha: new Date().toISOString(),
    });

    console.log("✅ Tip emocional publicado.");
  });

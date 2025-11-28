import { useState } from "react";
import { motion } from "framer-motion";
import {
  PaperAirplaneIcon,
  PencilSquareIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";

import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { askForumBot } from "../../api/forumAPI";

// Avatares emocionales
import neutralImg from "../../assets/emociones/emonical_avatar_neutral.png";
import ansiedadImg from "../../assets/emociones/emonical_avatar_ansiedad.png";
import enojoImg from "../../assets/emociones/emonical_avatar_enojo.png";
import estresImg from "../../assets/emociones/emonical_avatar_estres.png";
import miedoImg from "../../assets/emociones/emonical_avatar_miedo.png";
import tristezaImg from "../../assets/emociones/emonical_avatar_tristeza.png";

const EMOCIONES = [
  { id: "neutral", label: "Tranquil@", image: neutralImg },
  { id: "ansiedad", label: "Ansiedad", image: ansiedadImg },
  { id: "enojo", label: "Enojo", image: enojoImg },
  { id: "estres", label: "Estrés", image: estresImg },
  { id: "miedo", label: "Miedo", image: miedoImg },
  { id: "tristeza", label: "Tristeza", image: tristezaImg },
];

export default function ForoForm({ setPosts }) {
  const [loading, setLoading] = useState(false);
  const [botRespondio, setBotRespondio] = useState(false);
  const [emocion, setEmocion] = useState("neutral");

  const [focusInput, setFocusInput] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const form = e.currentTarget;
    const formData = new FormData(form);

    const texto = formData.get("texto")?.toString().trim();
    const autor = formData.get("autor")?.toString().trim() || "Anónimo";
    const titulo = formData.get("titulo")?.toString().trim() || "Pensamiento 💭";

    if (!texto) return;

    const fechaBonita = new Date().toLocaleDateString("es-MX", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    // ================== NUEVO POST ==================
    const nuevoPost = {
      autor,
      titulo,
      texto,
      emocion,
      fecha: fechaBonita,
      tipo: "usuario",
      timestamp: serverTimestamp(),
    };

    // Guardar en Firestore
    const ref = await addDoc(collection(db, "comentarios"), nuevoPost);
    nuevoPost.id = ref.id;

    // Actualizar lista
    setPosts((prev) => [nuevoPost, ...prev]);
    form.reset();

    setLoading(true);
    setBotRespondio(false);

    // ================== BOT ==================
    try {
      const textoParaBot = `Emoción: ${emocion}. Usuario escribió: ${texto}`;
      const respuesta = await askForumBot(textoParaBot);

      const respuestaBot = {
        autor: "Emonical Bot 🤍",
        titulo: "Respuesta a tu reflexión ✨",
        texto: respuesta || "Hubo un problema para procesar tu reflexión 💜",
        fecha: fechaBonita,
        tipo: "bot",
        timestamp: serverTimestamp(),
      };

      const refBot = await addDoc(collection(db, "comentarios"), respuestaBot);
      respuestaBot.id = refBot.id;

      // Insertar debajo del comentario original
      setPosts((prev) => {
        const arr = [...prev];
        const index = arr.findIndex((p) => p.id === nuevoPost.id);

        if (index >= 0) arr.splice(index + 1, 0, respuestaBot);
        else arr.unshift(respuestaBot);

        return arr;
      });

      setBotRespondio(true);
    } catch (err) {
      console.error("Error al enviar mensaje al bot:", err);
    }

    setLoading(false);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
      className={`relative z-10 bg-white/80 backdrop-blur-2xl rounded-3xl p-8 border border-white/40 shadow-[0_10px_35px_rgba(180,140,255,0.18)] grid gap-6 transition-all
        ${focusInput ? "shadow-[0_15px_45px_rgba(180,140,255,0.25)] scale-[1.01]" : ""}`}
    >
      {/* ====== ENCABEZADO ====== */}
      <div className="flex justify-center items-center gap-2 mb-2">
        <PencilSquareIcon className="h-6 w-6 text-[#9B6BFF]" />
        <h3 className="text-xl font-bold text-[#2D2D2D]">Comparte tu experiencia 💬</h3>
      </div>

      {/* ====== INPUTS ====== */}
      <div className="grid gap-3">
        <input
          name="autor"
          type="text"
          placeholder="Tu nombre (opcional)"
          onFocus={() => setFocusInput(true)}
          onBlur={() => setFocusInput(false)}
          className="rounded-2xl border bg-white/70 px-4 py-3 text-sm"
        />

        <input
          name="titulo"
          type="text"
          placeholder="Título"
          onFocus={() => setFocusInput(true)}
          onBlur={() => setFocusInput(false)}
          className="rounded-2xl border bg-white/70 px-4 py-3 text-sm"
        />

        {/* ===== SELECTOR EMOCIONES ===== */}
        <p className="text-xs font-semibold text-gray-600 mt-2">¿Cómo te sientes ahora?</p>

        <div className="flex flex-wrap gap-2">
          {EMOCIONES.map((emo) => (
            <motion.button
              key={emo.id}
              type="button"
              whileTap={{ scale: 0.93 }}
              onClick={() => setEmocion(emo.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-2xl text-xs border transition shadow-sm
                ${
                  emocion === emo.id
                    ? "border-[#9B6BFF] bg-[#F3EEFF]"
                    : "border-transparent bg-white/70 hover:bg-gray-100"
                }`}
            >
              <img src={emo.image} className="w-7 h-7 rounded-full" />
              {emo.label}
            </motion.button>
          ))}
        </div>

        {/* ===== TEXTO PRINCIPAL ===== */}
        <textarea
          name="texto"
          required
          placeholder="Escribe tu mensaje..."
          onFocus={() => setFocusInput(true)}
          onBlur={() => setFocusInput(false)}
          className="rounded-2xl border bg-white/70 px-4 py-3 text-sm h-36 resize-none"
        />
      </div>

      {/* ===== BOTÓN SUBMIT ===== */}
      <motion.button
        type="submit"
        whileTap={{ scale: 0.96 }}
        disabled={loading}
        className="flex items-center justify-center gap-2 py-3 rounded-2xl font-semibold text-white bg-gradient-to-r from-[#A78BFA] to-[#8BB8FF] shadow-lg"
      >
        {loading ? (
          <>
            <SparklesIcon className="h-5 w-5 animate-spin" />
            EmonicalBot está pensando...
          </>
        ) : (
          <>
            <PaperAirplaneIcon className="h-5 w-5 rotate-45" />
            Publicar
          </>
        )}
      </motion.button>

      {botRespondio && (
        <p className="text-center text-sm text-[#9B6BFF]">✨ EmonicalBot respondió a tu reflexión</p>
      )}
    </motion.form>
  );
}

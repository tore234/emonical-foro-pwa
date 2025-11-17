// Si usas Next.js 13 App Router:
// "use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  PaperAirplaneIcon,
  PencilSquareIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";

import { askForumBot } from "../../api/forumAPI";

// 👇 importa tus avatares de emociones
import neutralImg from "../../assets/emociones/emonical_avatar_neutral.png";
import ansiedadImg from "../../assets/emociones/emonical_avatar_ansiedad.png";
import enojoImg from "../../assets/emociones/emonical_avatar_enojo.png";
import estresImg from "../../assets/emociones/emonical_avatar_estres.png";
import miedoImg from "../../assets/emociones/emonical_avatar_miedo.png";
import tristezaImg from "../../assets/emociones/emonical_avatar_tristeza.png";

// 👇 catálogo de emociones
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
  const [emocion, setEmocion] = useState("neutral"); // 👈 emoción seleccionada

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const form = e.currentTarget;
    const formData = new FormData(form);

    const texto = (formData.get("texto") || "").toString().trim();
    if (!texto) return;

    const autor = (formData.get("autor") || "Anónimo").toString().trim();
    const titulo = (
      formData.get("titulo") || "Pensamiento compartido 💭"
    )
      .toString()
      .trim();

    const nuevoPost = {
      autor: autor || "Anónimo",
      titulo: titulo || "Pensamiento compartido 💭",
      texto,
      emocion, // 👈 guardamos emoción en el post
      fecha: new Date().toLocaleDateString("es-MX", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      tipo: "usuario",
    };

    // Publicación del usuario
    setPosts((prev) => [nuevoPost, ...prev]);
    form.reset();

    setLoading(true);
    setBotRespondio(false);

    try {
      // Le pasamos al bot también la emoción, para más contexto
      const textoParaBot = `Emoción actual: ${emocion}. Mensaje: ${texto}`;
      const replyText = await askForumBot(textoParaBot);

      const respuestaBot = {
        autor: "Emonical Bot 💫",
        titulo: "Respuesta a tu reflexión 🌿",
        texto: replyText || "💭 No pude procesar tu mensaje por ahora.",
        fecha: new Date().toLocaleDateString("es-MX", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        tipo: "bot",
      };

      // Insertar respuesta después del post del usuario
      setPosts((prev) => {
        const updated = [...prev];
        const indexUsuario = updated.findIndex(
          (p) =>
            p.texto === nuevoPost.texto &&
            p.autor === nuevoPost.autor &&
            p.titulo === nuevoPost.titulo
        );

        if (indexUsuario === -1) return [respuestaBot, ...updated];

        updated.splice(indexUsuario + 1, 0, respuestaBot);
        return updated;
      });

      setBotRespondio(true);
    } catch (error) {
      console.error("❌ Error al obtener respuesta del bot:", error);

      const mensajeError =
        error.name === "AbortError"
          ? "🌙 El servidor está despertando. Espera unos segundos e inténtalo de nuevo."
          : "💭 No pude contactar el servidor en este momento. Intenta más tarde.";

      setPosts((prev) => [
        ...prev,
        {
          autor: "Emonical Bot 💭",
          titulo: "Conexión en espera",
          texto: mensajeError,
          fecha: new Date().toLocaleDateString("es-MX", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
          tipo: "bot",
        },
      ]);
      setBotRespondio(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative z-10 bg-white/80 backdrop-blur-md border border-[#d9c8f3]/60 p-8 rounded-3xl shadow-[0_8px_25px_rgba(178,157,217,0.15)] mb-14 grid gap-5"
    >
      {/* 📝 Encabezado */}
      <div className="flex items-center justify-center mb-2">
        <PencilSquareIcon className="h-6 w-6 text-[#B29DD9] mr-2" />
        <h3 className="text-xl font-bold text-[#2D2D2D] tracking-tight">
          Comparte tu experiencia o pregunta 💬
        </h3>
      </div>

      {/* Campos */}
      <div className="grid gap-3">
        <input
          type="text"
          name="autor"
          placeholder="Tu nombre (opcional)"
          className="rounded-2xl border border-[#E0D7F8]/60 bg-white/70 px-4 py-3 text-sm focus:ring-2 focus:ring-[#B29DD9]/50 focus:border-[#B29DD9]/60 outline-none transition-all placeholder-gray-400"
        />

        <input
          type="text"
          name="titulo"
          placeholder="Título o tema"
          className="rounded-2xl border border-[#E0D7F8]/60 bg-white/70 px-4 py-3 text-sm focus:ring-2 focus:ring-[#B29DD9]/50 focus:border-[#B29DD9]/60 outline-none transition-all placeholder-gray-400"
        />

        {/* 👇 NUEVO: selector de emoción */}
        <div className="grid gap-2">
          <p className="text-xs font-semibold text-gray-600 mb-1">
            ¿Cómo te sientes ahora mismo?
          </p>
          <div className="flex flex-wrap gap-2">
            {EMOCIONES.map((emo) => (
              <button
                key={emo.id}
                type="button"
                onClick={() => setEmocion(emo.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-2xl border text-xs transition ${
                  emocion === emo.id
                    ? "border-[#B29DD9] bg-[#F3EEFF]"
                    : "border-transparent bg-white/70 hover:border-[#E0D7F8]"
                }`}
              >
                <img
                  src={emo.image}
                  alt={emo.label}
                  className="w-7 h-7 rounded-full"
                />
                <span>{emo.label}</span>
              </button>
            ))}
          </div>
        </div>

        <textarea
          name="texto"
          placeholder="Escribe tu mensaje o pregunta..."
          className="rounded-2xl border border-[#E0D7F8]/60 bg-white/70 px-4 py-3 text-sm h-36 resize-none focus:ring-2 focus:ring-[#B29DD9]/50 focus:border-[#B29DD9]/60 outline-none transition-all placeholder-gray-400"
          required
        />
      </div>

      {/* Botón */}
      <motion.button
        type="submit"
        whileTap={{ scale: 0.97 }}
        disabled={loading}
        className={`flex items-center justify-center gap-2 font-semibold py-3 rounded-2xl shadow-md transition-all duration-300 ${
          loading
            ? "bg-gradient-to-r from-gray-300 to-gray-200 text-gray-600 cursor-wait"
            : "bg-gradient-to-r from-[#B29DD9] to-[#B4C5F7] text-white hover:shadow-xl hover:scale-[1.02]"
        }`}
      >
        {loading ? (
          <>
            <SparklesIcon className="h-5 w-5 animate-spin text-white" />
            EmonicalBot está escribiendo...
          </>
        ) : (
          <>
            <PaperAirplaneIcon className="h-5 w-5 rotate-45" />
            Publicar
          </>
        )}
      </motion.button>

      {/* Confirmación visual */}
      {botRespondio && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-center mt-3 text-sm text-[#B29DD9] gap-1 font-medium"
        >
          <SparklesIcon className="h-4 w-4" />
          <span>✨ EmonicalBot ha respondido a tu publicación</span>
        </motion.div>
      )}
    </motion.form>
  );
}

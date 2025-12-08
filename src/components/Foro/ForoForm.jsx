// src/components/Foro/ForoForm.jsx
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
  { id: "neutral", label: "Tranquil@", image: neutralImg, emoji: "😌" },
  { id: "ansiedad", label: "Ansiedad", image: ansiedadImg, emoji: "😰" },
  { id: "enojo", label: "Enojo", image: enojoImg, emoji: "😠" },
  { id: "estres", label: "Estrés", image: estresImg, emoji: "😵‍💫" },
  { id: "miedo", label: "Miedo", image: miedoImg, emoji: "😨" },
  { id: "tristeza", label: "Tristeza", image: tristezaImg, emoji: "😢" },
];

// mini estrellas alrededor del formulario
const FORM_STARS = Array.from({ length: 32 }, () => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 1,
  delay: Math.random() * 6,
}));

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
    const titulo =
      formData.get("titulo")?.toString().trim() || "Pensamiento 💭";

    if (!texto) return;

    const fechaBonita = new Date().toLocaleDateString("es-MX", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const nuevoPost = {
      autor,
      titulo,
      texto,
      emocion,
      fecha: fechaBonita,
      tipo: "usuario",
      timestamp: serverTimestamp(),
    };

    const ref = await addDoc(collection(db, "comentarios"), nuevoPost);
    nuevoPost.id = ref.id;

    setPosts((prev) => [nuevoPost, ...prev]);
    form.reset();

    setLoading(true);
    setBotRespondio(false);

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

  const emocionSeleccionada =
    EMOCIONES.find((e) => e.id === emocion) || EMOCIONES[0];

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
      className="
        relative z-10 rounded-3xl 
        p-6 sm:p-8 grid gap-6
        border backdrop-blur-3xl
        overflow-hidden
      "
      style={{
        background: "var(--card-bg)",
        borderColor: "var(--card-border)",
        boxShadow: focusInput
          ? "0 0 45px var(--glow-purple)"
          : "0 0 25px var(--shadow-soft)",
        color: "var(--text-main)",
      }}
    >
      {/* estrellitas internas */}
      {FORM_STARS.map((star, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute rounded-full bg-white/90"
          style={{
            width: star.size,
            height: star.size,
            left: `${star.x}%`,
            top: `${star.y}%`,
            filter: "drop-shadow(0 0 6px var(--glow-purple))",
          }}
          animate={{ opacity: [0, 1, 0.3, 1] }}
          transition={{
            duration: 6 + star.size,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-1 relative">
        <div className="flex justify-center md:justify-start items-center gap-2">
          <PencilSquareIcon
            className="h-6 w-6"
            style={{ color: "var(--glow-purple)" }}
          />
          <h3
            className="text-lg sm:text-xl font-bold"
            style={{ color: "var(--text-main)" }}
          >
            Comparte tu experiencia 💬
          </h3>
        </div>

        {/* badge emoción actual */}
        <div className="flex items-center justify-center md:justify-end gap-2 text-xs sm:text-sm">
          <span
            className="px-3 py-1 rounded-full border backdrop-blur-xl flex items-center gap-2"
            style={{
              background: "var(--chip-bg, var(--input-bg))",
              borderColor: "var(--card-border)",
              color: "var(--text-soft)",
            }}
          >
            <img
              src={emocionSeleccionada.image}
              alt={emocionSeleccionada.label}
              className="w-7 h-7 rounded-full"
            />
            <span className="font-semibold">
              Estado actual: {emocionSeleccionada.emoji}{" "}
              {emocionSeleccionada.label}
            </span>
          </span>
        </div>
      </div>

      {/* INPUTS */}
      <div className="grid gap-3 sm:gap-4 relative">
        {/* Autor */}
        <div className="grid gap-1">
          <label
            className="text-[11px] sm:text-xs font-semibold tracking-wide"
            style={{ color: "var(--text-soft)" }}
          >
            Nombre
            <span style={{ color: "var(--text-soft)" }}> (opcional)</span>
          </label>
          <input
            name="autor"
            type="text"
            placeholder="Cómo quieres que te vean en el foro ✨"
            onFocus={() => setFocusInput(true)}
            onBlur={() => setFocusInput(false)}
            className="rounded-2xl px-4 py-2.5 text-sm transition border outline-none w-full"
            style={{
              background: "var(--input-bg)",
              borderColor: "var(--input-border)",
              color: "var(--text-main)",
            }}
          />
        </div>

        {/* Título */}
        <div className="grid gap-1">
          <label
            className="text-[11px] sm:text-xs font-semibold tracking-wide"
            style={{ color: "var(--text-soft)" }}
          >
            Título de tu publicación
          </label>
          <input
            name="titulo"
            type="text"
            placeholder="Ej. Hoy me sentí abrumad@, pero aprendí algo…"
            onFocus={() => setFocusInput(true)}
            onBlur={() => setFocusInput(false)}
            className="rounded-2xl px-4 py-2.5 text-sm transition border outline-none w-full"
            style={{
              background: "var(--input-bg)",
              borderColor: "var(--input-border)",
              color: "var(--text-main)",
            }}
          />
        </div>

        {/* Selector emociones */}
        <div className="grid gap-2 mt-1">
          <p
            className="text-[11px] sm:text-xs font-semibold uppercase tracking-wide"
            style={{ color: "var(--glow-purple)" }}
          >
            ¿Cómo te sientes ahora? 🌙
          </p>

          <div className="flex flex-wrap gap-2">
            {EMOCIONES.map((emo) => {
              const isActive = emocion === emo.id;
              return (
                <motion.button
                  key={emo.id}
                  type="button"
                  whileTap={{ scale: 0.93 }}
                  onClick={() => setEmocion(emo.id)}
                  className="flex items-center gap-2 px-3 py-2 rounded-2xl text-[11px] sm:text-xs transition border"
                  style={{
                    background: isActive
                      ? "var(--glow-purple)"
                      : "var(--input-bg)",
                    borderColor: "var(--card-border)",
                    color: isActive ? "#fff" : "var(--text-main)",
                    boxShadow: isActive
                      ? "0 0 14px var(--glow-purple)"
                      : "none",
                  }}
                >
                  <img
                    src={emo.image}
                    alt={emo.label}
                    className="w-7 h-7 rounded-full"
                  />
                  <span>{emo.emoji} {emo.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Texto principal */}
        <div className="grid gap-1 mt-2">
          <label
            className="text-[11px] sm:text-xs font-semibold tracking-wide"
            style={{ color: "var(--text-soft)" }}
          >
            Cuéntanos lo que llevas dentro 💭
          </label>
          <textarea
            name="texto"
            required
            placeholder="Escribe lo que quieras compartir. Puedes hablar de tu día, de algo que te preocupa o de algo que quieras celebrar 💜"
            onFocus={() => setFocusInput(true)}
            onBlur={() => setFocusInput(false)}
            className="rounded-2xl px-4 py-3 text-sm h-32 sm:h-36 resize-none border outline-none transition w-full"
            style={{
              background: "var(--input-bg)",
              borderColor: "var(--input-border)",
              color: "var(--text-main)",
            }}
          />
          <span
            className="text-[10px] sm:text-xs mt-1"
            style={{ color: "var(--text-soft)" }}
          >
            Recuerda: este es un espacio de respeto. Evita compartir datos muy
            personales o identificables 🌿
          </span>
        </div>
      </div>

      {/* BOTÓN */}
      <motion.button
        type="submit"
        whileTap={{ scale: 0.96 }}
        disabled={loading}
        className="flex items-center justify-center gap-2 py-3 rounded-2xl font-semibold text-sm sm:text-base transition disabled:opacity-70 disabled:cursor-not-allowed"
        style={{
          background:
            "linear-gradient(135deg, var(--glow-purple), var(--glow-blue))",
          color: "#fff",
          boxShadow: "0 0 25px var(--glow-purple)",
        }}
      >
        {loading ? (
          <>
            <SparklesIcon className="h-5 w-5 animate-spin" />
            EmonicalBot está pensando...
          </>
        ) : (
          <>
            <PaperAirplaneIcon className="h-5 w-5 rotate-45" />
            Publicar y recibir respuesta ✨
          </>
        )}
      </motion.button>

      {botRespondio && (
        <p
          className="text-center text-xs sm:text-sm mt-1"
          style={{ color: "var(--glow-purple)" }}
        >
          ✨ EmonicalBot respondió a tu reflexión. Gracias por compartir 💜
        </p>
      )}
    </motion.form>
  );
}

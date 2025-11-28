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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const form = e.currentTarget;
    const formData = new FormData(form);

    const texto = (formData.get("texto") || "").toString().trim();
    if (!texto) return;

    const autor = (formData.get("autor") || "Anónimo").toString().trim();
    const titulo = (formData.get("titulo") || "Pensamiento 💭").toString().trim();

    const fechaBonita = new Date().toLocaleDateString("es-MX", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    // ======== 1. CREAR OBJETO DEL USUARIO ========
    const nuevoPost = {
      autor: autor || "Anónimo",
      titulo,
      texto,
      emocion,
      fecha: fechaBonita,
      tipo: "usuario",
      timestamp: serverTimestamp(),
    };

    // ======== 2. GUARDAR EN FIRESTORE ========
    const ref = await addDoc(collection(db, "comentarios"), nuevoPost);

    nuevoPost.id = ref.id; // para mostrarlo inmediatamente

    // ======== 3. MOSTRAR EN FRONT ========
    setPosts((prev) => [nuevoPost, ...prev]);
    form.reset();

    setLoading(true);
    setBotRespondio(false);

    // ======== 4. ENVIAR AL BOT ========
    try {
      const textoParaBot = `Emoción: ${emocion}. Usuario escribió: ${texto}`;
      const respuesta = await askForumBot(textoParaBot);

      const respuestaBot = {
        autor: "Emonical Bot 🤍",
        titulo: "Respuesta a tu reflexión ✨",
        texto: respuesta || "No pude procesar tu mensaje ahora.",
        tipo: "bot",
        fecha: fechaBonita,
        emotion: "neutral",
        timestamp: serverTimestamp(),
      };

      // ======== 5. GUARDAR RESPUESTA DEL BOT EN FIRESTORE ========
      const botRef = await addDoc(collection(db, "comentarios"), respuestaBot);
      respuestaBot.id = botRef.id;

      // ======== 6. Insertar al lado del comentario del usuario ========
      setPosts((prev) => {
        const updated = [...prev];
        const iUser = updated.findIndex((p) => p.id === nuevoPost.id);

        if (iUser >= 0) updated.splice(iUser + 1, 0, respuestaBot);
        else updated.unshift(respuestaBot);

        return updated;
      });

      setBotRespondio(true);
    } catch (err) {
      console.error("Error del bot:", err);
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

      {/* TÍTULO DEL FORMULARIO */}
      <div className="flex items-center justify-center mb-2">
        <PencilSquareIcon className="h-6 w-6 text-[#B29DD9] mr-2" />
        <h3 className="text-xl font-bold text-[#2D2D2D]">
          Comparte tu experiencia 💬
        </h3>
      </div>

      {/* CAMPOS */}
      <div className="grid gap-3">
        <input
          type="text"
          name="autor"
          placeholder="Tu nombre (opcional)"
          className="rounded-2xl border bg-white/70 px-4 py-3 text-sm"
        />

        <input
          type="text"
          name="titulo"
          placeholder="Título"
          className="rounded-2xl border bg-white/70 px-4 py-3 text-sm"
        />

        {/* SELECTOR DE EMOCIÓN */}
        <p className="text-xs font-semibold text-gray-600">¿Cómo te sientes?</p>
        <div className="flex flex-wrap gap-2">
          {EMOCIONES.map((emo) => (
            <button
              key={emo.id}
              type="button"
              onClick={() => setEmocion(emo.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-2xl text-xs border transition ${
                emocion === emo.id
                  ? "border-[#B29DD9] bg-[#F3EEFF]"
                  : "border-transparent bg-white/70"
              }`}
            >
              <img src={emo.image} className="w-7 h-7 rounded-full" />
              {emo.label}
            </button>
          ))}
        </div>

        <textarea
          name="texto"
          placeholder="Escribe tu mensaje..."
          className="rounded-2xl border bg-white/70 px-4 py-3 text-sm h-36 resize-none"
          required
        />
      </div>

      {/* BOTÓN DE ENVIAR */}
      <motion.button
        type="submit"
        whileTap={{ scale: 0.97 }}
        disabled={loading}
        className="flex items-center justify-center gap-2 font-semibold py-3 rounded-2xl bg-gradient-to-r from-[#B29DD9] to-[#B4C5F7] text-white"
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

      {botRespondio && (
        <p className="text-center text-sm text-[#B29DD9]">
          ✨ EmonicalBot ha respondido
        </p>
      )}
    </motion.form>
  );
}

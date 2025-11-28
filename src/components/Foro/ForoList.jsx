import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon, ChevronUpIcon, UserCircleIcon } from "@heroicons/react/24/solid";

// Emojis Emonical 🤍
import neutralImg from "../../assets/emociones/emonical_avatar_neutral.png";
import ansiedadImg from "../../assets/emociones/emonical_avatar_ansiedad.png";
import enojoImg from "../../assets/emociones/emonical_avatar_enojo.png";
import estresImg from "../../assets/emociones/emonical_avatar_estres.png";
import miedoImg from "../../assets/emociones/emonical_avatar_miedo.png";
import tristezaImg from "../../assets/emociones/emonical_avatar_tristeza.png";

// Mapa emocional
const EMOCIONES = {
  neutral: { label: "Tranquil@", image: neutralImg },
  ansiedad: { label: "Ansiedad", image: ansiedadImg },
  enojo: { label: "Enojo", image: enojoImg },
  estres: { label: "Estrés", image: estresImg },
  miedo: { label: "Miedo", image: miedoImg },
  tristeza: { label: "Tristeza", image: tristezaImg },
};

export default function ForoList({ posts = [] }) {
  if (!Array.isArray(posts)) return null;

  return (
    <div className="relative z-10 space-y-8">
      {posts.map((p, index) => (
        <ForoCard key={p.id || index} post={p} index={index} />
      ))}
    </div>
  );
}

// 🟣 Tarjeta individual **expandible**
function ForoCard({ post, index }) {
  const [open, setOpen] = useState(false);

  const isBot =
    post?.tipo === "bot" || (post?.autor || "").toLowerCase().includes("bot");

  const titulo =
    post?.titulo || (isBot ? "✨ Mensaje del día" : "Publicación de la comunidad");

  const texto = post?.texto || "Sin contenido disponible.";
  const autor = post?.autor || "Anónimo";
  const fecha = post?.fecha || "Fecha desconocida";
  const emocion = EMOCIONES[post?.emocion] || EMOCIONES.neutral;

  // ✨ Preview del texto
  const preview =
    texto.length > 130 ? texto.slice(0, 130) + "..." : texto;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className={`rounded-3xl border border-white/40 p-6 backdrop-blur-xl transition-all shadow-[0_8px_35px_rgba(0,0,0,0.07)]
        ${
          isBot
            ? "bg-gradient-to-br from-[#DCCBFF]/60 via-[#C7D9FF]/50 to-[#B8F0FF]/60 shadow-[0_4px_25px_rgba(167,139,250,0.25)]"
            : "bg-white/80 shadow-[0_4px_20px_rgba(0,0,0,0.07)]"
        }`}
    >
      {/* ======= ENCABEZADO ======= */}
      <div
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <img
            src={isBot ? neutralImg : emocion.image}
            className="w-11 h-11 rounded-full shadow-md"
            alt={emocion.label}
          />
          <h3 className="text-lg font-semibold text-[#2D2D2D] tracking-tight">
            {titulo}
          </h3>
        </div>

        {open ? (
          <ChevronUpIcon className="h-6 w-6 text-[#9B6BFF]" />
        ) : (
          <ChevronDownIcon className="h-6 w-6 text-[#9B6BFF]" />
        )}
      </div>

      {/* ======= CONTENIDO (animado) ======= */}
      <AnimatePresence initial={false}>
        {!open ? (
          <motion.p
            key="preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-3 text-gray-700 leading-relaxed italic"
          >
            {preview}
          </motion.p>
        ) : (
          <motion.p
            key="full"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="mt-3 text-gray-700 leading-relaxed italic"
          >
            {texto}
          </motion.p>
        )}
      </AnimatePresence>

      {/* ======= FOOTER ======= */}
      <div className="mt-4 text-xs text-gray-500 flex justify-between items-center">
        <span className="flex items-center gap-1">
          <UserCircleIcon className="h-4 w-4 text-[#A78BFA]" />
          {autor}
        </span>
        <span>📅 {fecha}</span>
      </div>
    </motion.div>
  );
}

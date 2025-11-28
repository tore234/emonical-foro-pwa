import { motion } from "framer-motion";
import { UserCircleIcon } from "@heroicons/react/24/solid";

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
  if (!Array.isArray(posts)) {
    console.error("ForoList recibió posts inválidos:", posts);
    return null;
  }

  return (
    <div className="relative z-10 space-y-7">
      {posts.map((p, i) => {
        // Detectar si es bot
        const isBot =
          p?.tipo === "bot" ||
          (p?.autor || "").toLowerCase().includes("bot") ||
          p?.autor === "Emonical Bot 🤍";

        const titulo =
          p?.titulo ||
          (isBot ? "✨ Mensaje del día" : "Publicación de la comunidad");

        const texto = p?.texto || "Sin contenido disponible.";
        const autor = p?.autor || "Anónimo";
        const fecha = p?.fecha || "Fecha desconocida";

        const emocion = EMOCIONES[p?.emocion] || EMOCIONES.neutral;

        return (
          <motion.div
            key={p.id || `post-${i}`}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className={`relative rounded-3xl border border-white/40 p-6 backdrop-blur-xl transition-all shadow-[0_8px_35px_rgba(0,0,0,0.07)]
              ${
                isBot
                  ? "bg-gradient-to-br from-[#DCCBFF]/60 via-[#C7D9FF]/50 to-[#B8F0FF]/60 shadow-[0_4px_25px_rgba(167,139,250,0.25)]"
                  : "bg-white/80 shadow-[0_4px_20px_rgba(0,0,0,0.07)]"
              } hover:scale-[1.02]`}
          >
            {/* ======== Encabezado ======== */}
            <div className="flex items-center gap-3 mb-2">
              {!isBot ? (
                <img
                  src={emocion.image}
                  alt={emocion.label}
                  className="w-11 h-11 rounded-full shadow-md"
                />
              ) : (
                <img
                  src={neutralImg}
                  alt="bot"
                  className="w-11 h-11 rounded-full opacity-80"
                />
              )}

              <h3 className="text-lg font-semibold text-[#2D2D2D] tracking-tight">
                {titulo}
              </h3>
            </div>

            {/* ======== Cuerpo ======== */}
            <p className="text-gray-700 italic leading-relaxed mb-4">
              {texto}
            </p>

            {/* ======== Footer ======== */}
            <div className="text-xs text-gray-500 flex justify-between items-center">
              <span className="flex items-center gap-1">
                <UserCircleIcon className="h-4 w-4 text-[#A78BFA]" />
                {autor}
              </span>
              <span>📅 {fecha}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

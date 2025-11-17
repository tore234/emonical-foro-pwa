import { motion } from "framer-motion";
import { UserCircleIcon } from "@heroicons/react/24/solid";

// 👇 importa los mismos avatares que en ForoForm
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

const EMO_MAP = EMOCIONES.reduce((acc, emo) => {
  acc[emo.id] = emo;
  return acc;
}, {});

export default function ForoList({ posts = [] }) {
  return (
    <div className="relative z-10 space-y-6">
      {posts.map((p, i) => {
        const isBot =
          p?.tipo === "bot" || (p?.autor || "").toLowerCase().includes("bot");

        const titulo =
          p?.titulo ||
          (isBot ? "🌞 Mensaje del día" : "Publicación de la comunidad");

        const texto = p?.texto || "Sin contenido.";
        const autor = p?.autor || "Anónimo";
        const fecha = p?.fecha || "Sin fecha";

        const emo = EMO_MAP[p?.emocion] || EMO_MAP["neutral"];

        return (
          <motion.div
            key={p.id || `post-${i}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            viewport={{ once: true }}
            className={`relative rounded-3xl border border-white/40 p-6 shadow-[0_4px_20px_rgba(178,157,217,0.15)] backdrop-blur-lg ${
              isBot
                ? "bg-gradient-to-br from-[#C5D4F5]/50 via-[#B4C5F7]/40 to-[#CEEBF8]/50"
                : "bg-white/80"
            } hover:shadow-[0_6px_25px_rgba(178,157,217,0.3)] transition-all`}
          >
            {/* Encabezado con avatar de emoción (solo usuario) */}
            <div className="flex items-center gap-3 mb-2">
              {!isBot && (
                <img
                  src={emo.image}
                  alt={emo.label}
                  className="w-10 h-10 rounded-full"
                />
              )}
              <h3 className="text-lg font-semibold text-[#2D2D2D]">
                {titulo}
              </h3>
            </div>

            <p className="text-gray-700 italic leading-relaxed mb-3">
              {texto}
            </p>

            <div className="text-xs text-gray-500 flex justify-between items-center">
              <span className="flex items-center gap-1">
                <UserCircleIcon className="h-4 w-4 text-[#B29DD9]" />
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

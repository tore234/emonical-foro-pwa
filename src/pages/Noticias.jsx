import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  NewspaperIcon,
  SparklesIcon,
  PlayCircleIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "../context/ThemeContext";
import PsicologoCard from "../components/Noticias/PsicologoCard";

// ==================================================
//        DATA LOCAL
// ==================================================
const tipsBase = [
  {
    id: 1,
    emoji: "😌",
    frase:
      "Cuando sientas ansiedad, respira profundo y enfoca tu atención en el presente. La respiración es un ancla emocional.",
    autor: "Psic. Christian Daniel García",
  },
  {
    id: 2,
    emoji: "💖",
    frase:
      "Permítete sentir sin juzgarte. Las emociones no se controlan… se comprenden.",
    autor: "Psic. Christian Daniel García",
  },
  {
    id: 3,
    emoji: "🛌",
    frase:
      "Dormir bien es cuidar tu mente. No subestimes el poder del descanso emocional.",
    autor: "Psic. Christian Daniel García",
  },
  {
    id: 4,
    emoji: "✍️",
    frase:
      "Escribir tus pensamientos ayuda a liberar tensión mental. Hazlo aunque no tenga sentido.",
    autor: "Psic. Christian Daniel García",
  },
  {
    id: 5,
    emoji: "🌱",
    frase: "No compares tu proceso. Cada persona florece en su propio tiempo.",
    autor: "Emonical Bot 💫",
  },
];

const noticiasLocales = [
  {
    id: 1,
    titulo: "Respira mejor en 2 minutos",
    texto:
      "Aprende una técnica rápida para calmar la ansiedad y reconectar con tu cuerpo.",
    autor: "Equipo Emonical",
    fecha: "13 Oct 2025",
  },
  {
    id: 2,
    titulo: "Micro pausas emocionales",
    texto:
      "Tomar descansos conscientes mejora la concentración y reduce la fatiga mental.",
    autor: "Psic. Ana Torres",
    fecha: "10 Oct 2025",
  },
  {
    id: 3,
    titulo: "Dormir bien = pensar mejor",
    texto:
      "El descanso emocional es tan importante como el físico. Conoce cómo crear una rutina nocturna saludable.",
    autor: "Revista MindfulMx",
    fecha: "5 Oct 2025",
  },
];

const videosSaludMental = [
  {
    id: "v1",
    titulo: "Levánte y anda  🌿",
    url: "https://www.youtube.com/embed/_6Xp03Lwm6A?si=lQqkYSeNnZo5FVRr",
  },
  {
    id: "v2",
    titulo: "Cómo calmar la mente en 2 minutos 🧘",
    url: "https://www.youtube.com/embed/KGBa47k4ag0?si=n-PUoof5JSIvrxIv",
  },
  {
    id: "v3",
    titulo: "Aprende a soltar pensamientos negativos ☁️",
    url: "https://www.youtube.com/embed/Ff333V7Gk7c?si=HciSG8Tv4xaTcNIu",
  },
];

// ==================================================
//                 COMPONENTE
// ==================================================
export default function Noticias() {
  const [noticias, setNoticias] = useState(noticiasLocales);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // ===== PALETA QUE FUNCIONA EN AMBOS MODOS =====
  const pageBgAurora = isDark
    ? "linear-gradient(135deg, rgba(15,23,42,1), rgba(76,29,149,0.85), rgba(15,23,42,1))"
    : "linear-gradient(135deg, rgba(219,234,254,0.9), rgba(224,231,255,0.9), rgba(244,219,255,0.85))";

  const chipBg = isDark ? "rgba(15,23,42,0.85)" : "rgba(255,255,255,0.85)";
  const chipBorder = isDark
    ? "rgba(148,163,184,0.8)"
    : "rgba(209,213,219,0.9)";
  const chipText = isDark ? "#E5E7EB" : "#4B5563";

  const titleColor = isDark ? "#E5E7EB" : "#1F2937";
  const subtitleColor = isDark ? "#CBD5F5" : "#4B5563";

  const accentText = isDark ? "#C4B5FD" : "#7C3AED";
  const accentIcon = isDark ? "#A5B4FC" : "#7C3AED";

  const tipCardBg = isDark ? "rgba(15,23,42,0.95)" : "rgba(255,255,255,0.96)";
  const tipBorder = isDark
    ? "rgba(129,140,248,0.55)"
    : "rgba(221,214,254,1)";
  const tipQuoteColor = isDark ? "#E5E7EB" : "#1F2937";

  const newsCardBg = isDark ? "rgba(15,23,42,0.95)" : "rgba(255,255,255,0.96)";
  const newsCardBorder = isDark
    ? "rgba(148,163,184,0.6)"
    : "rgba(214,226,255,1)";
  const newsText = isDark ? "#E5E7EB" : "#111827";
  const newsMuted = isDark ? "#9CA3AF" : "#6B7280";

  const videoCardBg = isDark ? "rgba(15,23,42,0.98)" : "rgba(255,255,255,0.98)";
  const videoCardBorder = isDark
    ? "rgba(129,140,248,0.6)"
    : "rgba(221,214,254,1)";

  useEffect(() => {
    const obtenerNoticias = async () => {
      try {
        const res = await fetch(
          "https://newsdata.io/api/1/news?apikey=pub_34593a52753cb25691e1e2092ea7b3b7b49b5&q=salud+mental&language=es"
        );
        const data = await res.json();

        if (data?.results) {
          const noticiasAPI = data.results.slice(0, 6).map((n, index) => ({
            id: n.article_id || index,
            titulo: n.title || "Artículo sin título",
            texto: n.description || "Sin descripción disponible.",
            autor: n.source_id || "Fuente externa",
            fecha: new Date(n.pubDate).toLocaleDateString("es-MX", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }),
          }));

          setNoticias([...noticiasAPI, ...noticiasLocales]);
        }
      } catch (error) {
        console.error("Error al obtener noticias:", error);
      } finally {
        setLoading(false);
      }
    };

    obtenerNoticias();
  }, []);

  return (
    <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 overflow-hidden">
      {/* ==================================================
          AURORA / BACKGROUND
      ================================================== */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ backgroundImage: pageBgAurora }}
        animate={{ opacity: [0.9, 1, 0.9] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Halo central suave */}
      <motion.div
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[420px] h-[420px] sm:w-[560px] sm:h-[560px] rounded-full blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(244,244,255,0.8), transparent)",
        }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ==================================================
          ENCABEZADO
      ================================================== */}
      <header className="relative z-10 text-center mb-12 sm:mb-16 space-y-4 px-2">
        {/* Chip superior */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] sm:text-xs font-semibold border shadow-sm"
          style={{ backgroundColor: chipBg, borderColor: chipBorder, color: chipText }}
        >
          <NewspaperIcon className="h-4 w-4" />
          Actualizamos tu universo de bienestar ✨
        </motion.div>

        {/* Título principal */}
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight"
          style={{ color: titleColor }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Noticias & Tips para tu mente 💜
        </motion.h2>

        {/* Descripción */}
        <p
          className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed"
          style={{ color: subtitleColor }}
        >
          Descubre recursos breves, artículos recientes y videos pensados para
          acompañarte en tu cuidado emocional día a día 🌿
        </p>
      </header>

      {/* ==================================================
          TIPS DEL DÍA
      ================================================== */}
      <section className="relative z-10 mb-14 sm:mb-20">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h3
            className="text-lg sm:text-2xl font-bold flex items-center gap-2"
            style={{ color: accentText }}
          >
            <SparklesIcon className="h-6 w-6" style={{ color: accentIcon }} />
            Tips del día
          </h3>
          <p className="text-[11px] sm:text-xs" style={{ color: subtitleColor }}>
            Pequeños recordatorios para suavizar tu día ✨
          </p>
        </div>

        {/* Lista horizontal */}
        <motion.div
          className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide pb-2 sm:pb-3 -mx-1 px-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {tipsBase.map((tip) => (
            <motion.article
              key={tip.id}
              whileHover={{ scale: 1.03, y: -2 }}
              transition={{ duration: 0.18 }}
              className="min-w-[240px] sm:min-w-[280px] md:min-w-[320px] 
                         rounded-2xl p-4 sm:p-5 relative overflow-hidden border shadow-lg"
              style={{
                backgroundColor: tipCardBg,
                borderColor: tipBorder,
              }}
            >
              {/* Emoji + numerito */}
              <div className="flex items-center justify-between mb-3 text-xs sm:text-sm font-semibold">
                <span className="inline-flex items-center gap-1">
                  <span className="text-lg sm:text-xl">{tip.emoji}</span>
                  <span style={{ color: subtitleColor }}>Tip #{tip.id}</span>
                </span>
                <span className="text-[10px]" style={{ color: subtitleColor }}>
                  ⏱ 10 seg
                </span>
              </div>

              {/* Frase */}
              <p
                className="italic text-xs sm:text-sm md:text-base leading-relaxed mb-3"
                style={{ color: tipQuoteColor }}
              >
                “{tip.frase}”
              </p>

              <span
                className="text-right block text-[11px] sm:text-xs font-semibold"
                style={{ color: accentText }}
              >
                — {tip.autor}
              </span>
            </motion.article>
          ))}
        </motion.div>
      </section>

      {/* ==================================================
          NOTICIAS
      ================================================== */}
      <section className="relative z-10 mb-14 sm:mb-20">
        <div className="flex items-center justify-between gap-2 mb-5 flex-wrap">
          <h3
            className="text-lg sm:text-2xl font-bold flex items-center gap-2"
            style={{ color: accentText }}
          >
            <NewspaperIcon className="h-6 w-6" style={{ color: accentIcon }} />
            Últimas noticias sobre bienestar 🌍
          </h3>
          <p className="text-[11px] sm:text-xs" style={{ color: subtitleColor }}>
            Fuentes externas + toques Emonical 💫
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center py-10 text-xs sm:text-sm" style={{ color: subtitleColor }}>
            <SparklesIcon className="h-6 w-6 animate-spin" style={{ color: accentIcon }} />
            <span className="mt-2">Cargando noticias para ti...</span>
          </div>
        ) : (
          <div className="grid gap-6 sm:gap-7 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {noticias.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                viewport={{ once: true, amount: 0.3 }}
                className="rounded-2xl p-5 sm:p-6 border shadow-lg hover:shadow-2xl 
                           hover:-translate-y-1 transition-all flex flex-col justify-between"
                style={{
                  backgroundColor: newsCardBg,
                  borderColor: newsCardBorder,
                }}
              >
                <div>
                  <h4
                    className="text-base sm:text-lg font-semibold mb-2"
                    style={{ color: newsText }}
                  >
                    {item.titulo}
                  </h4>

                  <p
                    className="text-xs sm:text-sm leading-relaxed mb-4 line-clamp-4"
                    style={{ color: newsMuted }}
                  >
                    {item.texto}
                  </p>
                </div>

                <div
                  className="pt-2 mt-auto flex items-center justify-between border-t text-[10px] sm:text-[11px]"
                  style={{ borderColor: isDark ? "rgba(55,65,81,0.7)" : "#E5E7EB", color: newsMuted }}
                >
                  <span className="font-medium flex items-center gap-1">
                    📝 {item.autor}
                  </span>
                  <span>📅 {item.fecha}</span>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>

      {/* ==================================================
          VIDEOS
      ================================================== */}
      <section className="relative z-10 mb-14 sm:mb-20">
        <div className="text-center mb-5 sm:mb-6 px-2">
          <h3
            className="text-lg sm:text-2xl font-bold flex justify-center gap-2 mb-2"
            style={{ color: accentText }}
          >
            <PlayCircleIcon className="h-6 w-6 sm:h-7 sm:w-7" style={{ color: accentIcon }} />
            Videos que inspiran bienestar 🎬
          </h3>
          <p
            className="max-w-xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed"
            style={{ color: subtitleColor }}
          >
            Tómate una pausa consciente: elige un video, ponte audífonos y regálate unos minutos para ti 💫
          </p>
        </div>

        <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 sm:pb-8 scrollbar-hide -mx-1 px-1">
          {videosSaludMental.map((video) => (
            <motion.article
              key={video.id}
              whileHover={{ scale: 1.03, y: -2 }}
              transition={{ duration: 0.25 }}
              className="min-w-[260px] sm:min-w-[320px] md:min-w-[360px] 
                         rounded-2xl overflow-hidden border shadow-lg flex flex-col"
              style={{
                backgroundColor: videoCardBg,
                borderColor: videoCardBorder,
              }}
            >
              <div className="w-full aspect-video">
                <iframe
                  src={video.url}
                  title={video.titulo}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>

              <div className="p-3 sm:p-4 text-center">
                <h4
                  className="font-semibold text-xs sm:text-sm md:text-base leading-snug"
                  style={{ color: newsText }}
                >
                  {video.titulo}
                </h4>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ==================================================
          PSICÓLOGO
      ================================================== */}
      <section className="relative z-10 pb-4 sm:pb-6">
        <PsicologoCard />
      </section>
    </main>
  );
}

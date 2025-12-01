// src/components/Noticias/PsicologoCard.jsx
import { useMemo } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import DaniImg from "../../assets/psicologo-dani.png";

export default function PsicologoCard() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const frasesDani = [
    "Un paso define una cosa: avanzar. No temas darlo; así es como inicia todo cambio. 🚶‍♂️",
    "El dolor no es el enemigo, es el recordatorio de que sigues vivo y luchando. 💔➡️💪",
    "Amarte no es egoísmo, es reconocer tu propio valor. Cuida de ti como cuidas de quien amas. 💖",
    "Respira, comprende tu instante y deja que el presente sea suficiente. 🌬️",
    "La valentía no es ausencia de miedo, sino avanzar incluso con él. Atrévete a soñar. 🌙✨",
    "Renovar tu espacio interior es tan importante como limpiar el exterior. Da paso a lo nuevo. 🧹🧠",
    "Emoción significa movimiento. Sigue buscando, sigue creciendo; ahí habita la vida. 🌱",
  ];

  const badges = ["Ansiedad", "Autoestima", "Descanso mental", "Mindfulness"];

  // Frase principal fija por render (no cambia cada re-render)
  const fraseAleatoria = useMemo(
    () =>
      frasesDani[Math.floor(Math.random() * frasesDani.length)],
    [] // solo al montar
  );

  // Paleta según tema
  const titleColor = isDark ? "#E5E7EB" : "#4C1D95";
  const subtitleColor = isDark ? "#CBD5F5" : "#4B5563";

  const mainCardBg = isDark
    ? "rgba(15,23,42,0.96)"
    : "rgba(255,255,255,0.96)";
  const mainCardBorder = isDark
    ? "rgba(165,180,252,0.6)"
    : "rgba(221,214,254,0.95)";

  const quoteTextColor = isDark ? "#E5E7EB" : "#111827";

  const carouselCardBg = isDark
    ? "linear-gradient(135deg, rgba(17,24,39,0.96), rgba(30,64,175,0.85))"
    : "linear-gradient(135deg, rgba(219,234,254,0.95), rgba(233,213,255,0.9))";
  const carouselTextColor = isDark ? "#E5E7EB" : "#1F2937";

  return (
    <section className="relative z-10 mt-20 sm:mt-24">
      {/* Encabezado */}
      <motion.div
        className="text-center mb-10 px-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-3 text-[11px] sm:text-xs font-semibold border backdrop-blur-md bg-white/10 dark:bg-slate-900/60 border-violet-200/60 dark:border-slate-600/80 text-violet-700 dark:text-violet-200">
          🌟 Acompañamiento profesional
        </div>

        <h3
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2"
          style={{ color: titleColor }}
        >
          Consejos del Psic. Christian Daniel García Sánchez
        </h3>

        <p
          className="max-w-2xl mx-auto text-sm sm:text-base leading-relaxed"
          style={{ color: subtitleColor }}
        >
          Reflexiones breves para reconectar contigo, darte un respiro y
          recordar que no estás solo en tu proceso emocional 🌿
        </p>
      </motion.div>

      {/* Bloque principal: foto + frase */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 px-4">
        {/* Imagen del psicólogo */}
        <motion.div
          className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full overflow-hidden shadow-xl"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Halo detrás */}
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_top,#A855F7,transparent_70%)] opacity-80 blur-[6px]" />
          <div className="relative w-full h-full rounded-full border-4 border-violet-300/70 dark:border-violet-400/70 overflow-hidden">
            <img
              src={DaniImg}
              alt="Psic. Christian Daniel García Sánchez"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Estrellitas decorativas */}
          <span className="absolute -top-2 -right-1 text-xl">✨</span>
          <span className="absolute bottom-1 -left-1 text-lg">💜</span>
        </motion.div>

        {/* Frase destacada */}
        <motion.div
          className="w-full max-w-xl rounded-3xl border shadow-lg backdrop-blur-xl px-5 sm:px-7 py-5 sm:py-6"
          style={{
            backgroundColor: mainCardBg,
            borderColor: mainCardBorder,
          }}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-violet-500 dark:text-violet-300">
              💬 Frase del momento
            </span>
            <div className="flex gap-1 text-[10px] sm:text-xs text-amber-400">
              ⭐⭐⭐⭐⭐
            </div>
          </div>

          <p
            className="italic text-sm sm:text-lg leading-relaxed mb-3"
            style={{ color: quoteTextColor }}
          >
            “{fraseAleatoria}”
          </p>

          <p className="text-xs sm:text-sm font-semibold text-violet-600 dark:text-violet-300">
            — Psic. Christian Daniel García Sánchez
          </p>

          {/* Badges temáticos */}
          <div className="flex flex-wrap gap-2 mt-4">
            {badges.map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] sm:text-xs font-medium bg-violet-50 text-violet-700 border border-violet-100 dark:bg-violet-950/60 dark:text-violet-200 dark:border-violet-800/80"
              >
                🌱 {badge}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Carrusel de frases */}
      <motion.div
        className="mt-12 sm:mt-14 flex gap-4 sm:gap-5 overflow-x-auto px-4 pb-4 scrollbar-hide"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {frasesDani.map((frase, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.04, y: -2 }}
            transition={{ duration: 0.2 }}
            className="min-w-[240px] sm:min-w-[280px] md:min-w-[320px] rounded-2xl p-4 sm:p-5 border shadow-md backdrop-blur-md flex flex-col justify-between"
            style={{ backgroundImage: carouselCardBg, borderColor: "rgba(255,255,255,0.45)" }}
          >
            <p
              className="italic text-xs sm:text-sm leading-relaxed mb-3"
              style={{ color: carouselTextColor }}
            >
              “{frase}”
            </p>
            <span className="text-[11px] sm:text-xs font-semibold text-slate-900/80 dark:text-slate-100/90">
              — Psic. Christian Daniel García Sánchez
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

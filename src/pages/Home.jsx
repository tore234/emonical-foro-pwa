import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router-dom";

/* ---------------------- Helpers ---------------------- */
function makeStars(count) {
  return Array.from({ length: count }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 6,
  }));
}

const CONSTELLATION_LINES = [
  { top: "18%", left: "10%", width: "120px", rotate: -12 },
  { top: "30%", left: "68%", width: "150px", rotate: 18 },
  { top: "58%", left: "14%", width: "130px", rotate: 8 },
  { top: "72%", left: "64%", width: "110px", rotate: -18 },
];

const PHRASES = [
  "Tu emoción de hoy no define tu historia completa.",
  "Un pequeño paso de valor ya es un gran acto de amor propio.",
  "No estás solo: tu voz importa, tu sentir también.",
  "Respira, suelta, y date permiso de empezar de nuevo.",
];

export default function Home() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const reduceMotion = useReducedMotion();

  // Menos partículas en móvil
  const isMobile = typeof window !== "undefined" ? window.innerWidth < 640 : true;
  const STARS = useMemo(() => makeStars(isMobile ? 16 : 36), [isMobile]);

  // Frases: intervalo pausado si reduceMotion para ahorrar ciclos
  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(
      () => setPhraseIndex((p) => (p + 1) % PHRASES.length),
      7000
    );
    return () => clearInterval(id);
  }, [reduceMotion]);

  const currentPhrase = PHRASES[phraseIndex];

  /* ===== Estilos memorizados por tema (evita crear objetos cada render) ===== */
  const styles = useMemo(() => {
    const bgGradient = isDark
      ? "linear-gradient(to bottom right,#1B1135,#24183F,#0D091C)"
      : "linear-gradient(to bottom right,#F4F3FF,#F9FAFB,#ECFEFF)";

    const auroraMain = isDark
      ? "radial-gradient(circle at 30% 20%,rgba(108,99,255,0.36),transparent 70%)"
      : "radial-gradient(circle at 30% 20%,rgba(129,140,248,0.28),transparent 70%)";

    const auraCyan = isDark ? "rgba(0,210,255,0.22)" : "rgba(34,211,238,0.22)";

    const textMain = isDark ? "#EAE6FF" : "#1F1235";
    const textSub = isDark ? "#C9C1FF" : "#4C4375";

    const discoverText = isDark ? "#E5E7EB" : "#312E81";
    const discoverBg = isDark ? "rgba(15,23,42,0.82)" : "rgba(255,255,255,0.75)";
    const discoverBorder = isDark ? "rgba(148,163,184,0.55)" : "#E0E7FF";

    return {
      bgGradient,
      auroraMain,
      auraCyan,
      textMain,
      textSub,
      discoverText,
      discoverBg,
      discoverBorder,
    };
  }, [isDark]);

  const animate = !reduceMotion;

  return (
    <div
      className="relative flex flex-col items-center justify-center text-center 
                 min-h-[calc(100vh-180px)] px-6 pt-12 pb-24 overflow-hidden select-none"
      style={{ color: styles.textMain }}
    >
      {/* Fondo */}
      <div className="absolute inset-0" style={{ backgroundImage: styles.bgGradient }} />

      {/* Aurora principal (blur reducido) */}
      {animate ? (
        <motion.div
          className="absolute inset-0 blur-[100px] sm:blur-[140px]"
          style={{ backgroundImage: styles.auroraMain }}
          animate={{ opacity: [0.25, 0.5, 0.25] }}
          transition={{ duration: 14, repeat: Infinity }}
        />
      ) : (
        <div
          className="absolute inset-0 blur-[80px] sm:blur-[120px]"
          style={{ backgroundImage: styles.auroraMain, opacity: 0.35 }}
        />
      )}

      {/* Aura cian */}
      {animate ? (
        <motion.div
          className="absolute w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] rounded-full bottom-10 right-10 blur-[110px]"
          style={{ backgroundColor: styles.auraCyan }}
          animate={{ x: [0, 12, 0], y: [0, -12, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : (
        <div
          className="absolute w-[320px] h-[320px] rounded-full bottom-10 right-10 blur-[100px]"
          style={{ backgroundColor: styles.auraCyan }}
        />
      )}

      {/* Estrellas (sin box-shadow pesado) */}
      {animate &&
        STARS.map((s, i) => (
          <motion.div
            key={i}
            className="pointer-events-none absolute rounded-full bg-white/90"
            style={{
              width: s.size,
              height: s.size,
              left: `${s.x}%`,
              top: `${s.y}%`,
            }}
            animate={{ opacity: [0, 1, 0.35, 1] }}
            transition={{
              duration: 5 + s.size,
              delay: s.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

      {/* Constelaciones (sin sombras difusas) */}
      {animate &&
        CONSTELLATION_LINES.map((line, i) => (
          <motion.div
            key={`line-${i}`}
            className="pointer-events-none absolute origin-left"
            style={{
              top: line.top,
              left: line.left,
              width: line.width,
              height: "1px",
              rotate: line.rotate,
              background:
                "linear-gradient(to right, rgba(129,140,248,0), rgba(129,140,248,0.9), rgba(56,189,248,0))",
            }}
            animate={{ opacity: [0.25, 1, 0.25] }}
            transition={{ duration: 9, delay: i * 1.2, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

      {/* Logo */}
      <motion.img
        src="/assets/emonical-logo.png "
        alt="Logo Emonical"
        loading="lazy"
        width={224}
        height={96}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-44 md:w-56 mb-6 relative z-10"
      />

      {/* Avatar flotante (apagado si reduceMotion) */}
      {animate ? (
        <motion.img
          src="/assets/emonical-avatar.png"
          alt="Avatar Emonical"
          loading="lazy"
          width={256}
          height={256}
          animate={{ y: [0, -16, 0], rotate: [0, 2, -2, 0], scale: [1, 1.03, 1] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          className="w-48 md:w-64 relative z-10"
        />
      ) : (
        <img
          src="/assets/emonical-avatar.png"
          alt="Avatar Emonical"
          loading="lazy"
          width={256}
          height={256}
          className="w-48 md:w-64 relative z-10"
        />
      )}

      {/* Título */}
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.6 }}
        className="mt-8 max-w-xl relative z-10"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold leading-snug mb-4" style={{ color: styles.textMain }}>
          Bienvenido a{" "}
          <span className="bg-gradient-to-r from-[#A855F7] to-[#22D3EE] bg-clip-text text-transparent">
            Emonical Foro
          </span>
        </h1>
        <p className="text-base md:text-lg leading-relaxed opacity-95" style={{ color: styles.textSub }}>
          Un espacio seguro donde puedes expresarte, conectar con otros y encontrar apoyo emocional cuando lo necesites 💜.
        </p>
      </motion.div>

      {/* Botones */}
      <motion.div
        className="mt-12 flex flex-col sm:flex-row gap-5 relative z-10"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.45 }}
      >
        {/* Foro */}
        <Link
          to="/foro"
          className="group relative inline-flex items-center justify-center px-9 py-3.5 rounded-2xl text-lg font-semibold text-white overflow-hidden transition-all"
          style={{ boxShadow: "0 6px 16px rgba(99,102,241,0.35)" }}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-[#A855F7] via-[#6366F1] to-[#22D3EE] opacity-90 group-hover:opacity-100 transition-all duration-400" />
          {animate && (
            <motion.span
              className="absolute w-48 h-48 bg-white/25 blur-3xl rounded-full opacity-0 group-hover:opacity-50"
              animate={{ scale: [0.85, 1.1, 0.85] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
          <span className="relative z-10">Entrar al Foro</span>
        </Link>

        {/* Descubrir */}
        <Link
          to="/descubrir"
          className="group relative inline-flex items-center justify-center px-9 py-3.5 rounded-2xl text-lg font-semibold transition-all duration-300"
          style={{
            color: styles.discoverText,
            backgroundColor: styles.discoverBg,
            backdropFilter: "blur(14px)",
            borderWidth: 1,
            borderColor: styles.discoverBorder,
            boxShadow: "0 6px 16px rgba(99,102,241,0.25)",
          }}
        >
          <span className="relative z-10">Descubrir App</span>
        </Link>
      </motion.div>

      {/* Frase final (animación barata) */}
      <div className="mt-10 mb-4 relative z-10">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentPhrase}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.45 }}
            className="text-sm md:text-base italic"
          >
            <motion.span
              className="bg-clip-text text-transparent font-medium"
              style={{
                backgroundImage: "linear-gradient(90deg,#A855F7,#22D3EE,#F97316,#A855F7)",
                backgroundSize: "300% 300%",
              }}
              animate={animate ? { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] } : undefined}
              transition={animate ? { duration: 10, repeat: Infinity, ease: "linear" } : undefined}
            >
              “{currentPhrase}”
            </motion.span>
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}

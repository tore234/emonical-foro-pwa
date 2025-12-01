import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

// ---------------------- CONSTELACIONES / ESTRELLAS ----------------------

const STARS = Array.from({ length: 40 }, () => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 1,
  delay: Math.random() * 6,
}));

const CONSTELLATION_LINES = [
  { top: "18%", left: "10%", width: "120px", rotate: -12 },
  { top: "30%", left: "68%", width: "150px", rotate: 18 },
  { top: "58%", left: "14%", width: "130px", rotate: 8 },
  { top: "72%", left: "64%", width: "110px", rotate: -18 },
];

// --------------------------- FRASES DINÁMICAS ---------------------------

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

  useEffect(() => {
    const interval = setInterval(
      () => setPhraseIndex((p) => (p + 1) % PHRASES.length),
      7000
    );
    return () => clearInterval(interval);
  }, []);

  const currentPhrase = PHRASES[phraseIndex];

  // ===== COLORES SEGÚN MODO =====
  const bgGradient = isDark
    ? "linear-gradient(to bottom right,#1B1135,#24183F,#0D091C)"
    : "linear-gradient(to bottom right,#F4F3FF,#F9FAFB,#ECFEFF)";

  const auroraColor = isDark
    ? "radial-gradient(circle at 30% 20%,rgba(108,99,255,0.45),transparent 70%)"
    : "radial-gradient(circle at 30% 20%,rgba(129,140,248,0.35),transparent 70%)";

  const auraCyan = isDark
    ? "rgba(0,210,255,0.28)"
    : "rgba(34,211,238,0.28)";

  const textMain = isDark ? "#EAE6FF" : "#1F1235";
  const textSub = isDark ? "#C9C1FF" : "#4C4375";

  const discoverText = isDark ? "#E5E7EB" : "#312E81";
  const discoverBg = isDark ? "rgba(15,23,42,0.85)" : "rgba(255,255,255,0.7)";
  const discoverBorder = isDark
    ? "rgba(148,163,184,0.6)"
    : "#E0E7FF";

  return (
    <div
      className="
        relative flex flex-col items-center justify-center text-center 
        min-h-[calc(100vh-180px)] px-6 pt-12 pb-24
        overflow-hidden select-none
      "
      style={{ color: textMain }}
    >
      {/* === CAPA 1: FONDO CÓSMICO (LIGHT / DARK) === */}
      <motion.div
        className="absolute inset-0"
        style={{ backgroundImage: bgGradient }}
        animate={{ opacity: [0.9, 1, 0.9] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* === CAPA 2: AURORA PRINCIPAL NEÓN SUAVE === */}
      <motion.div
        className="absolute inset-0 blur-[160px]"
        style={{ backgroundImage: auroraColor }}
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 14, repeat: Infinity }}
      />

      {/* === CAPA 3: AURA CIAN SUAVE === */}
      <motion.div
        className="absolute w-[420px] h-[420px] rounded-full bottom-10 right-10 blur-[170px]"
        style={{ backgroundColor: auraCyan }}
        animate={{ x: [0, 15, 0], y: [0, -15, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* === CAPA 4: ESTRELLAS / CONSTELACIONES === */}
      {STARS.map((star, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute rounded-full bg-white"
          style={{
            width: star.size,
            height: star.size,
            left: `${star.x}%`,
            top: `${star.y}%`,
            boxShadow: "0 0 10px rgba(129,140,248,0.6)",
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

      {CONSTELLATION_LINES.map((line, i) => (
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
            boxShadow: "0 0 14px rgba(129,140,248,0.7)",
          }}
          animate={{ opacity: [0.25, 1, 0.25] }}
          transition={{
            duration: 10,
            delay: i * 1.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* === LOGO === */}
      <motion.img
        src="/assets/emonical-logo.png"
        alt="Logo Emonical"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="
          w-44 md:w-56 mb-6 relative z-10
          drop-shadow-[0_0_18px_rgba(129,140,248,0.7)]
        "
      />

      {/* === AVATAR NEÓN FLOTANTE === */}
      <motion.img
        src="/assets/emonical-avatar.png"
        alt="Avatar Emonical"
        animate={{
          y: [0, -18, 0],
          rotate: [0, 2, -2, 0],
          scale: [1, 1.04, 1],
        }}
        transition={{
          duration: 3.6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          w-48 md:w-64 
          drop-shadow-[0_20px_35px_rgba(129,140,248,0.55)] 
          relative z-10
        "
      />

      {/* === TÍTULO === */}
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.9 }}
        className="mt-8 max-w-xl relative z-10"
      >
        <h1
          className="
          text-4xl md:text-6xl font-extrabold leading-snug mb-4
        "
          style={{ color: textMain }}
        >
          Bienvenido a{" "}
          <span
            className="
            bg-gradient-to-r from-[#A855F7] to-[#22D3EE]
            bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(168,85,247,0.75)]
          "
          >
            Emonical Foro
          </span>
        </h1>

        <p
          className="
          text-base md:text-lg leading-relaxed opacity-95
        "
          style={{ color: textSub }}
        >
          Un espacio seguro donde puedes expresarte, conectar con otros
          y encontrar apoyo emocional cuando lo necesites 💜.
        </p>
      </motion.div>

      {/* === BOTONES NEÓN === */}
      <motion.div
        className="mt-12 flex flex-col sm:flex-row gap-5 relative z-10"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        {/* BOTÓN FORO */}
        <a
          href="/foro"
          className="
            group relative inline-flex items-center justify-center 
            px-9 py-3.5 rounded-2xl text-lg font-semibold text-white 
            overflow-hidden
            shadow-[0_0_20px_rgba(129,140,248,0.7)]
            transition-all
          "
        >
          <span
            className="
              absolute inset-0 
              bg-gradient-to-r from-[#A855F7] via-[#6366F1] to-[#22D3EE]
              opacity-90 group-hover:opacity-100 
              transition-all duration-500
            "
          />

          <motion.span
            className="
              absolute w-48 h-48 bg-white/30 blur-3xl rounded-full opacity-0 
              group-hover:opacity-60
            "
            animate={{ scale: [0.8, 1.1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          <span className="relative z-10">Entrar al Foro</span>
        </a>

        {/* BOTÓN DESCUBRIR */}
        <a
          href="/descubrir"
          className="
            group relative inline-flex items-center justify-center 
            px-9 py-3.5 rounded-2xl text-lg font-semibold 
            transition-all duration-300
          "
          style={{
            color: discoverText,
            backgroundColor: discoverBg,
            backdropFilter: "blur(18px)",
            borderWidth: 1,
            borderColor: discoverBorder,
            boxShadow: "0 0 16px rgba(129,140,248,0.35)",
          }}
        >
          <span className="relative z-10">Descubrir App</span>
        </a>
      </motion.div>

      {/* === FRASE FINAL DINÁMICA RGB === */}
      <div className="mt-10 mb-4 relative z-10">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentPhrase}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.6 }}
            className="text-sm md:text-base italic"
          >
            <motion.span
              className="bg-clip-text text-transparent font-medium"
              style={{
                backgroundImage:
                  "linear-gradient(90deg,#A855F7,#22D3EE,#F97316,#A855F7)",
                backgroundSize: "300% 300%",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              “{currentPhrase}”
            </motion.span>
          </motion.p>
        </AnimatePresence>
      </div>

      {/* aquí abajo ya tienes espacio para tu footer / derechos reservados */}
    </div>
  );
}

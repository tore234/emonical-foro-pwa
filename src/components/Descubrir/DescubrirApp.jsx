// src/components/Descubrir/DescubrirApp.jsx
import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import {
  DevicePhoneMobileIcon,
  CubeTransparentIcon,
  HeartIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/solid";

import { useTheme } from "../../context/ThemeContext";

// Mockups
import mockHome from "../../assets/mockups/emonical_home.png";
import mockEmociones from "../../assets/mockups/emonical_emociones.png";
import mockChat from "../../assets/mockups/emonical_chat.png";
import mockPerfil from "../../assets/mockups/emonical_perfil.png";

// Avatares emocionales
import avatarAnsiedad from "../../assets/emociones/emonical_avatar_ansiedad.png";
import avatarEnojo from "../../assets/emociones/emonical_avatar_enojo.png";
import avatarEstres from "../../assets/emociones/emonical_avatar_estres.png";
import avatarMiedo from "../../assets/emociones/emonical_avatar_miedo.png";
import avatarNeutral from "../../assets/emociones/emonical_avatar_neutral.png";
import avatarTristeza from "../../assets/emociones/emonical_avatar_tristeza.png";

/* -------------------------------------------------------------------------- */
/*                               CONFIGURACIÓN                                */
/* -------------------------------------------------------------------------- */

const EMOTIONS = [
  { mood: "neutral", color: "#8B5CF6", avatar: avatarNeutral },
  { mood: "ansiedad", color: "#14B8A6", avatar: avatarAnsiedad },
  { mood: "miedo", color: "#06b6d4", avatar: avatarMiedo },
  { mood: "estrés", color: "#f43f5e", avatar: avatarEstres },
  { mood: "enojo", color: "#db2777", avatar: avatarEnojo },
  { mood: "tristeza", color: "#64748b", avatar: avatarTristeza },
];

const PREVIEWS = [
  { src: mockHome },
  { src: mockEmociones },
  { src: mockChat },
  { src: mockPerfil },
];

const FEATURES = [
  {
    icon: HeartIcon,
    title: "Bienestar que vibra contigo",
    text: "Ambientes cósmicos y ejercicios neon guiados.",
  },
  {
    icon: CubeTransparentIcon,
    title: "Realidad Aumentada",
    text: "Energías AR según tu emoción.",
  },
  {
    icon: DevicePhoneMobileIcon,
    title: "Experiencia fluida",
    text: "Funciona como PWA o APK, rápida y ligera.",
  },
];

/* ANIMACIÓN FLOAT */
const floatVariant = {
  initial: { opacity: 0, y: 50, scale: 0.9 },
  animate: (i) => ({
    opacity: 1,
    y: [0, -20, 0],
    rotate: [0, i % 2 ? -3 : 3, 0],
    transition: {
      y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
      rotate: { duration: 7, repeat: Infinity },
      opacity: { delay: i * 0.12, duration: 0.8 },
    },
  }),
};

// Partículas cósmicas
const generateParticles = (count) =>
  Array.from({ length: count }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 5,
  }));

/* -------------------------------------------------------------------------- */

export default function DescubrirApp() {
  const [active, setActive] = useState(0);
  const [emotionIndex, setEmotionIndex] = useState(0);
  const particles = useRef(generateParticles(40));
  const { theme } = useTheme();
  const isDark = theme === "dark";

  /* Cambio automático de mockups */
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((p) => (p + 1) % PREVIEWS.length);
      setEmotionIndex((e) => (e + 1) % EMOTIONS.length);
    }, 3300);
    return () => clearInterval(interval);
  }, []);

  /* Avatar 3D reactivo al mouse */
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-10, 10]);

  const current = EMOTIONS[emotionIndex];

  const cardBg = isDark ? "rgba(15,23,42,0.9)" : "rgba(255,255,255,0.96)";
  const cardBorder = isDark
    ? "rgba(248,250,252,0.18)"
    : "rgba(148,163,184,0.55)";

  return (
    <section
      id="descubrir-app"
      className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32 overflow-hidden"
      style={{ color: "var(--text-main)" }}
    >
      {/* --------------------------- FONDO DINÁMICO --------------------------- */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          background: isDark
            ? "linear-gradient(to bottom right, #050014, #16002b, #020617)"
            : "linear-gradient(to bottom right, #f5f0ff, #e8f7ff, #ffffff)",
        }}
        animate={{ opacity: [0.95, 1, 0.95] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* NEBULOSAS RESPONSIVAS */}
      <motion.div
        className="pointer-events-none absolute w-[500px] h-[500px] blur-[180px] rounded-full -top-32 -left-32"
        style={{ background: current.color + "55" }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <motion.div
        className="pointer-events-none absolute w-[450px] h-[450px] blur-[160px] rounded-full bottom-0 -right-20"
        style={{ background: current.color + "44" }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 14, repeat: Infinity }}
      />

      {/* ----------------------------- PARTÍCULAS ----------------------------- */}
      {particles.current.map((p, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute rounded-full bg-white/60"
          style={{
            width: p.size,
            height: p.size,
            left: p.x + "%",
            top: p.y + "%",
            filter: `drop-shadow(0 0 6px ${current.color})`,
          }}
          animate={{ y: ["0%", "-200%"], opacity: [0, 1, 0] }}
          transition={{
            duration: 8 + p.size,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* CARD PRINCIPAL CON BORDE RGB SUAVE */}
      <div className="relative z-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_0_60px_rgba(15,23,42,0.65)] overflow-hidden">
        <div className="relative z-20 grid md:grid-cols-2 gap-14 lg:gap-20 items-center px-6 md:px-10 py-10 lg:py-16">
          {/* ----------------------------- LEFT SIDE ----------------------------- */}
          <div className="space-y-8">
            <div
              className="inline-flex items-center px-4 py-1 text-sm rounded-full border backdrop-blur-xl"
              style={{
                color: current.color,
                backgroundColor: isDark
                  ? "rgba(15,23,42,0.85)"
                  : "rgba(255,255,255,0.85)",
                borderColor: cardBorder,
              }}
            >
              ✨ Tema emocional: {current.mood}
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
              Emonical
              <span
                className="block mt-1 text-transparent bg-gradient-to-r bg-clip-text"
                style={{
                  backgroundImage: `linear-gradient(to right, ${current.color}, #22d3ee, #a855f7)`,
                }}
              >
                NeoGlow
              </span>
            </h2>

            <p
              className="text-base md:text-lg leading-relaxed max-w-md"
              style={{ color: "var(--text-soft)" }}
            >
              Tu espacio emocional ahora vibra contigo.  
              Interfaz reactiva según tu estado emocional.  
              Ambientes neon, animaciones vivas y AR emocional.
            </p>

            {/* FEATURES */}
            <div className="grid gap-5">
              {FEATURES.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={i}
                    variants={floatVariant}
                    initial="initial"
                    animate="animate"
                    custom={i}
                    whileHover={{ scale: 1.05, x: 6 }}
                    className="flex gap-4 items-start rounded-2xl p-5 md:p-6 border"
                    style={{
                      boxShadow: `0 0 30px ${current.color}33`,
                      background: cardBg,
                      borderColor: cardBorder,
                    }}
                  >
                    <div
                      className="h-12 w-12 rounded-xl flex items-center justify-center"
                      style={{
                        background: `linear-gradient(to bottom right, ${current.color}, #22d3ee)`,
                        boxShadow: `0 0 25px ${current.color}aa`,
                      }}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>

                    <div>
                      <h3
                        className="font-semibold mb-1"
                        style={{ color: current.color }}
                      >
                        {item.title}
                      </h3>
                      <p
                        className="text-sm md:text-base"
                        style={{ color: "var(--text-soft)" }}
                      >
                        {item.text}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA */}
            <motion.a
              href="/emonical.apk"
              download
              whileHover={{ scale: 1.08, translateY: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-9 py-3.5 rounded-full text-white font-semibold mt-4 shadow-xl"
              style={{
                background: `linear-gradient(to right, ${current.color}, #22d3ee, #a855f7)`,
                boxShadow: `0 0 35px ${current.color}`,
              }}
            >
              <ArrowDownTrayIcon className="h-6 w-6" />
              Descargar APK
            </motion.a>
          </div>

          {/* ----------------------------- RIGHT SIDE ----------------------------- */}
          <motion.div
            className="relative w-full max-w-md h-[460px] md:h-[520px] mx-auto"
            onMouseMove={(e) => x.set(e.clientX - window.innerWidth / 2)}
          >
            {/* MARCO RGB ANIMADO */}
            <motion.div
              className="absolute inset-[-3px] rounded-[38px]"
              style={{
                background: `conic-gradient(from 180deg, ${current.color}, #22d3ee, #a855f7, #facc15, ${current.color})`,
                opacity: isDark ? 0.95 : 0.8,
                filter: "blur(0.5px)",
              }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
            />

            {/* GLASS INTERIOR SEGÚN TEMA */}
            <div
              className="absolute inset-0 rounded-[34px] border"
              style={{
                background: isDark
                  ? "radial-gradient(circle at top, rgba(15,23,42,0.96), rgba(2,6,23,0.98))"
                  : "radial-gradient(circle at top, rgba(248,250,252,0.98), rgba(226,232,240,0.96))",
                borderColor: cardBorder,
                backdropFilter: "blur(26px)",
              }}
            />

            {/* LÍNEAS RGB EN LAS ESQUINAS (RELLENO BORDES VACÍOS) */}
            <motion.div
              className="pointer-events-none absolute -top-10 left-6 h-24 w-24 rounded-full"
              style={{
                background: `radial-gradient(circle at center, ${current.color}, transparent)`,
                opacity: 0.7,
              }}
              animate={{ y: [0, 10, 0], opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="pointer-events-none absolute -bottom-8 right-10 h-24 w-40 rounded-full"
              style={{
                background: `radial-gradient(circle at center, #22d3ee, transparent)`,
                opacity: 0.7,
              }}
              animate={{ y: [0, -10, 0], opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* CONTENIDO DEL TELÉFONO */}
            <div className="relative z-30 flex items-center justify-center h-full">
              {/* Avatar 3D reactivo */}
              <motion.img
                src={current.avatar}
                alt="Avatar emocional"
                className="absolute top-1/2 left-1/2 w-32 h-32 -translate-x-1/2 -translate-y-[65%] z-40"
                style={{
                  rotate,
                  filter: `drop-shadow(0 0 32px ${current.color})`,
                }}
                animate={{ y: [0, -14, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Mockups MÁS GRANDES */}
              {PREVIEWS.map((img, i) => (
                <motion.img
                  key={i}
                  src={img.src}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{
                    opacity: active === i ? 1 : 0,
                    scale: active === i ? 1.04 : 0.96,
                    y: active === i ? 0 : 30,
                  }}
                  transition={{ duration: 0.9 }}
                  className="absolute w-52 h-[22rem] md:w-64 md:h-[26rem] object-cover rounded-[30px] shadow-2xl border"
                  style={{
                    borderColor: "rgba(148,163,184,0.45)",
                    boxShadow: `0 0 45px ${current.color}88`,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

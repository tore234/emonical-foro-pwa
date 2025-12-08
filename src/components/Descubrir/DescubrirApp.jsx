import { useState, useEffect, useMemo, useRef } from "react";
import { motion, useMotionValue, useTransform, useReducedMotion } from "framer-motion";
import {
  DevicePhoneMobileIcon,
  CubeTransparentIcon,
  HeartIcon,
  ArrowDownTrayIcon,
  ExclamationTriangleIcon,
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

/* ------------------------------ Config ------------------------------ */

const EMOTIONS = [
  { mood: "neutral", color: "#8B5CF6", avatar: avatarNeutral },
  { mood: "ansiedad", color: "#14B8A6", avatar: avatarAnsiedad },
  { mood: "miedo", color: "#06b6d4", avatar: avatarMiedo },
  { mood: "estrés", color: "#f43f5e", avatar: avatarEstres },
  { mood: "enojo", color: "#db2777", avatar: avatarEnojo },
  { mood: "tristeza", color: "#64748b", avatar: avatarTristeza },
];

const PREVIEWS = [{ src: mockHome }, { src: mockEmociones }, { src: mockChat }, { src: mockPerfil }];

const FEATURES = [
  { icon: HeartIcon, title: "Bienestar que vibra contigo", text: "Ambientes cósmicos y ejercicios neon guiados." },
  { icon: CubeTransparentIcon, title: "Realidad Aumentada híbrida", text: "Energías AR según tu emoción en un entorno inmersivo." },
  { icon: DevicePhoneMobileIcon, title: "Experiencia fluida", text: "Funciona como PWA o APK, rápida y ligera." },
];

// Partículas
function makeParticles(count) {
  return Array.from({ length: count }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 5,
  }));
}

/* --------------------------- Componente ---------------------------- */

export default function DescubrirApp() {
  const [active, setActive] = useState(0);
  const [emotionIndex, setEmotionIndex] = useState(0);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const reduceMotion = useReducedMotion();

  // Menos partículas en móvil
  const isMobile = typeof window !== "undefined" ? window.innerWidth < 640 : true;
  const particles = useMemo(() => makeParticles(isMobile ? 18 : 36), [isMobile]);

  // Carrusel: pausa si reduceMotion
  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => {
      setActive((p) => (p + 1) % PREVIEWS.length);
      setEmotionIndex((e) => (e + 1) % EMOTIONS.length);
    }, 3600);
    return () => clearInterval(id);
  }, [reduceMotion]);

  // Avatar 3D reactivo (throttle con rAF)
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-10, 10]);
  const rafRef = useRef(null);
  const handleMouseMove = (e) => {
    if (reduceMotion) return;
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      x.set(e.clientX - window.innerWidth / 2);
      rafRef.current = null;
    });
  };

  const current = EMOTIONS[emotionIndex];

  // Estilos memo
  const styles = useMemo(() => {
    const cardBg = isDark ? "rgba(15,23,42,0.9)" : "rgba(255,255,255,0.96)";
    const cardBorder = isDark ? "rgba(248,250,252,0.18)" : "rgba(148,163,184,0.55)";
    const bgGrad = isDark
      ? "linear-gradient(to bottom right, #050014, #16002b, #020617)"
      : "linear-gradient(to bottom right, #f5f0ff, #e8f7ff, #ffffff)";
    return { cardBg, cardBorder, bgGrad };
  }, [isDark]);

  const animate = !reduceMotion;

  return (
    <section
      id="descubrir-app"
      className="relative max-w-7xl mx-auto px-6 py-20 sm:py-24 lg:py-32 overflow-hidden"
      style={{ color: "var(--text-main)" }}
    >
      {/* Fondo */}
      <div className="absolute inset-0 -z-10" style={{ background: styles.bgGrad }} />

      {/* Nebulosas (blur reducido) */}
      {animate ? (
        <>
          <motion.div
            className="pointer-events-none absolute w-[420px] h-[420px] sm:w-[500px] sm:h-[500px] blur-[140px] sm:blur-[180px] rounded-full -top-32 -left-32"
            style={{ background: current.color + "55" }}
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ duration: 12, repeat: Infinity }}
          />
          <motion.div
            className="pointer-events-none absolute w-[380px] h-[380px] sm:w-[450px] sm:h-[450px] blur-[120px] sm:blur-[160px] rounded-full bottom-0 -right-20"
            style={{ background: current.color + "44" }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 14, repeat: Infinity }}
          />
        </>
      ) : (
        <>
          <div
            className="pointer-events-none absolute w-[420px] h-[420px] blur-[120px] rounded-full -top-32 -left-32"
            style={{ background: current.color + "40" }}
          />
          <div
            className="pointer-events-none absolute w-[380px] h-[380px] blur-[110px] rounded-full bottom-0 -right-20"
            style={{ background: current.color + "33" }}
          />
        </>
      )}

      {/* Partículas (sin drop-shadow caro) */}
      {animate &&
        particles.map((p, i) => (
          <motion.div
            key={i}
            className="pointer-events-none absolute rounded-full bg-white/80"
            style={{ width: p.size, height: p.size, left: p.x + "%", top: p.y + "%" }}
            animate={{ y: ["0%", "-180%"], opacity: [0, 1, 0] }}
            transition={{ duration: 7 + p.size, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

      {/* Card principal */}
      <div
        className="relative z-10 rounded-3xl border bg-white/5 backdrop-blur-2xl shadow-[0_10px_36px_rgba(15,23,42,0.45)] overflow-hidden"
        style={{ borderColor: "rgba(255,255,255,0.08)" }}
      >
        <div className="relative z-20 grid md:grid-cols-2 gap-10 lg:gap-16 items-center px-6 md:px-10 py-10 lg:py-16">
          {/* Left */}
          <div className="space-y-6">
            <div
              className="inline-flex items-center px-4 py-1 text-sm rounded-full border backdrop-blur-xl"
              style={{
                color: current.color,
                backgroundColor: isDark ? "rgba(15,23,42,0.85)" : "rgba(255,255,255,0.85)",
                borderColor: styles.cardBorder,
              }}
            >
              ✨ Tema emocional: {current.mood}
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
              Emonical
              <span
                className="block mt-1 text-transparent bg-gradient-to-r bg-clip-text"
                style={{ backgroundImage: `linear-gradient(to right, ${current.color}, #22d3ee, #a855f7)` }}
              >
                Chat & Bienestar
              </span>
            </h2>

            <div className="space-y-4">
              <p className="text-base md:text-lg leading-relaxed max-w-md" style={{ color: "var(--text-soft)" }}>
                Tu espacio emocional ahora vibra contigo. Interfaz reactiva según tu estado emocional, ambientes neon,
                animaciones vivas y una experiencia híbrida entre AR y VR.
              </p>

              <div
                className="flex gap-3 items-start rounded-2xl px-4 py-3 text-sm md:text-base"
                style={{
                  backgroundColor: isDark ? "rgba(15,23,42,0.9)" : "rgba(248,250,252,0.98)",
                  border: `1px solid ${styles.cardBorder}`,
                  boxShadow: `0 0 16px ${current.color}33`,
                }}
              >
                <div
                  className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full"
                  style={{ background: `linear-gradient(to bottom right, ${current.color}, #22d3ee)` }}
                >
                  <ExclamationTriangleIcon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p>
                    <span className="font-semibold">Para un uso óptimo de Emonical,</span> instala:
                  </p>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>
                      <strong>APK principal</strong> (app Emonical).
                    </li>
                    <li>
                      <strong>APK de Realidad Aumentada</strong> (escenario híbrido AR / VR).
                    </li>
                  </ul>
                  <p className="mt-2 text-xs md:text-sm opacity-80">
                    ⚠️ Estos enlaces de descarga son temporales y caducan el <strong>12 de diciembre</strong>.
                  </p>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="grid gap-4">
              {FEATURES.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="flex gap-4 items-start rounded-2xl p-5 md:p-6 border"
                    style={{
                      background: styles.cardBg,
                      borderColor: styles.cardBorder,
                      boxShadow: `0 0 20px ${current.color}2a`,
                    }}
                  >
                    <div
                      className="h-12 w-12 rounded-xl flex items-center justify-center"
                      style={{ background: `linear-gradient(to bottom right, ${current.color}, #22d3ee)` }}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1" style={{ color: current.color }}>
                        {item.title}
                      </h3>
                      <p className="text-sm md:text-base" style={{ color: "var(--text-soft)" }}>
                        {item.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <a
                href="https://fromsmash.com/Emonicalapk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-3 px-6 py-3.5 rounded-full font-semibold shadow-md border transition active:scale-95"
                style={{
                  backgroundColor: isDark ? "rgba(15,23,42,0.96)" : "rgba(255,255,255,0.98)",
                  borderColor: styles.cardBorder,
                  color: "var(--text-main)",
                }}
              >
                <ArrowDownTrayIcon className="h-5 w-5" />
                Descargar APK Emonical
              </a>

              <a
                href="https://fromsmash.com/Emonicalar"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-3 px-6 py-3.5 rounded-full text-white font-semibold shadow-xl transition active:scale-95"
                style={{ background: `linear-gradient(to right, ${current.color}, #22d3ee, #a855f7)` }}
              >
                <ArrowDownTrayIcon className="h-5 w-5" />
                Descargar módulo AR (recomendado)
              </a>
            </div>
          </div>

          {/* Right */}
          <div
            className="relative w-full max-w-md h-[440px] md:h-[520px] mx-auto"
            onMouseMove={handleMouseMove}
          >
            {/* Marco (sin rotación si reduceMotion) */}
            {animate ? (
              <motion.div
                className="absolute inset-[-3px] rounded-[38px]"
                style={{
                  background: `conic-gradient(from 180deg, ${current.color}, #22d3ee, #a855f7, #facc15, ${current.color})`,
                  opacity: isDark ? 0.9 : 0.8,
                  filter: "blur(0.5px)",
                }}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
              />
            ) : (
              <div
                className="absolute inset-[-3px] rounded-[38px]"
                style={{
                  background: `conic-gradient(from 180deg, ${current.color}, #22d3ee, #a855f7, #facc15, ${current.color})`,
                  opacity: 0.6,
                  filter: "blur(0.5px)",
                }}
              />
            )}

            {/* Interior */}
            <div
              className="absolute inset-0 rounded-[34px] border"
              style={{
                background: isDark
                  ? "radial-gradient(circle at top, rgba(15,23,42,0.96), rgba(2,6,23,0.98))"
                  : "radial-gradient(circle at top, rgba(248,250,252,0.98), rgba(226,232,240,0.96))",
                borderColor: styles.cardBorder,
                backdropFilter: "blur(18px)",
              }}
            />

            {/* Luces suaves */}
            {animate && (
              <>
                <motion.div
                  className="pointer-events-none absolute -top-10 left-6 h-20 w-20 rounded-full"
                  style={{ background: `radial-gradient(circle at center, ${current.color}, transparent)`, opacity: 0.6 }}
                  animate={{ y: [0, 8, 0], opacity: [0.45, 0.8, 0.45] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="pointer-events-none absolute -bottom-8 right-10 h-20 w-36 rounded-full"
                  style={{ background: `radial-gradient(circle at center, #22d3ee, transparent)`, opacity: 0.6 }}
                  animate={{ y: [0, -8, 0], opacity: [0.45, 0.8, 0.45] }}
                  transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
                />
              </>
            )}

            {/* Contenido */}
            <div className="relative z-30 flex items-center justify-center h-full">
              {/* Avatar reactivo */}
              {animate ? (
                <motion.img
                  src={current.avatar}
                  alt="Avatar emocional"
                  className="absolute top-1/2 left-1/2 w-32 h-32 -translate-x-1/2 -translate-y-[65%] z-40"
                  style={{ rotate }}
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
                  loading="lazy"
                  decoding="async"
                  width={128}
                  height={128}
                />
              ) : (
                <img
                  src={current.avatar}
                  alt="Avatar emocional"
                  className="absolute top-1/2 left-1/2 w-32 h-32 -translate-x-1/2 -translate-y-[65%] z-40"
                  loading="lazy"
                  decoding="async"
                  width={128}
                  height={128}
                />
              )}

              {/* Mockups (lazy + dimensiones) */}
              {PREVIEWS.map((img, i) => (
                <motion.img
                  key={i}
                  src={img.src}
                  initial={{ opacity: 0, scale: 0.96, y: 12 }}
                  animate={{
                    opacity: active === i ? 1 : 0,
                    scale: active === i ? 1.02 : 0.96,
                    y: active === i ? 0 : 18,
                  }}
                  transition={{ duration: 0.6 }}
                  className="absolute w-52 h-[22rem] md:w-64 md:h-[26rem] object-cover rounded-[30px] shadow-xl border"
                  style={{ borderColor: "rgba(148,163,184,0.45)" }}
                  loading="lazy"
                  decoding="async"
                  width={256}
                  height={416}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

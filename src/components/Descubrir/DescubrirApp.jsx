// src/components/Descubrir/DescubrirApp.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  DevicePhoneMobileIcon,
  CubeTransparentIcon,
  HeartIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/solid";

import mockHome from "../../assets/mockups/emonical_home.png";
import mockEmociones from "../../assets/mockups/emonical_emociones.png";
import mockChat from "../../assets/mockups/emonical_chat.png";
import mockPerfil from "../../assets/mockups/emonical_perfil.png";

const FEATURES = [
  {
    icon: HeartIcon,
    title: "Crecimiento emocional ❤️",
    text: "Sesiones guiadas, respiración consciente y actividades breves para acompañarte día a día.",
  },
  {
    icon: CubeTransparentIcon,
    title: "Realidad Aumentada (AR) ✨",
    text: "Explora entornos inmersivos que representan calma, energía o enfoque según cómo te sientas.",
  },
  {
    icon: DevicePhoneMobileIcon,
    title: "Optimizada para tu móvil 📱",
    text: "Instálala como PWA desde el navegador o descarga el APK seguro.",
  },
];

const PREVIEWS = [
  { src: mockHome, alt: "Pantalla de inicio de Emonical AR" },
  { src: mockEmociones, alt: "Pantalla para registrar emociones" },
  { src: mockChat, alt: "Pantalla de chat con Emonical" },
  { src: mockPerfil, alt: "Pantalla de perfil de usuario" },
];

// 🎞️ Animación flotante
const floatVariant = {
  initial: { opacity: 0, y: 40, scale: 0.95 },
  animate: (i) => ({
    opacity: 1,
    y: [0, -12, 0],
    scale: 1,
    rotate: [0, i % 2 === 0 ? -2 : 2, 0],
    transition: {
      opacity: { delay: i * 0.15, duration: 0.6 },
      y: {
        delay: 0.4 + i * 0.1,
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
      rotate: {
        delay: 0.4 + i * 0.1,
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  }),
};

export default function DescubrirApp() {

  // ⭐ Cambio automático de imágenes
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % PREVIEWS.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="descubrir-app"
      className="relative max-w-7xl mx-auto px-6 py-20 overflow-hidden"
    >
      {/* 🌈 Fondo Aurora Premium */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#B7C8FF]/40 via-[#E6D9FF]/35 to-[#A9E1FF]/40 blur-3xl opacity-70"
        animate={{ opacity: [0.4, 0.9, 0.4], scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      {/* 💫 Halo dinámico */}
      <motion.div
        className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-[#C5B0FF]/40 blur-[120px]"
        animate={{ x: [0, -18, 0], y: [0, 18, 0] }}
        transition={{ duration: 14, repeat: Infinity }}
      />

      {/* GRID principal */}
      <div className="relative z-10 grid md:grid-cols-2 gap-14 items-center">

        {/* ------------------ IZQUIERDA ------------------ */}
        <div className="space-y-7">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur-xl px-4 py-1 text-xs text-[#7A5FCF] font-semibold border border-white/50 shadow-sm"
          >
            <CubeTransparentIcon className="h-4 w-4" />
            Bienestar + Realidad Aumentada + PWA ✨
          </motion.div>

          {/* Título */}
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1A1B2E] leading-tight tracking-tight"
          >
            Descubre
            <span className="block mt-1 relative">
              <span className="absolute inset-0 bg-gradient-to-r from-[#B29DD9] to-[#C5D4F5] blur-xl opacity-50 rounded-lg" />
              <span className="relative bg-gradient-to-r from-[#B29DD9] to-[#C5D4F5] text-transparent bg-clip-text drop-shadow-lg">
                Emonical Móvil 🌿
              </span>
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-700 text-lg leading-relaxed"
          >
            Tu espacio emocional en el bolsillo: emociones, AR, chat terapéutico
            y herramientas de bienestar que crecen contigo 💜
          </motion.p>

          {/* CARACTERÍSTICAS */}
          <div className="grid gap-4">
            {FEATURES.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  whileHover={{ scale: 1.03, x: 6 }}
                  transition={{ type: "spring", stiffness: 250 }}
                  className="flex gap-4 items-start rounded-2xl bg-white/75 border border-white/50 px-5 py-4 shadow-lg backdrop-blur-xl"
                >
                  <div className="h-12 w-12 rounded-xl bg-[#F4EDFF] flex items-center justify-center shadow-inner">
                    <Icon className="h-6 w-6 text-[#A88BE3]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#2D2D2D]">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.text}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Botón APK */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
          >
            <motion.a
              href="/emonical.apk"
              download
              whileHover={{ scale: 1.07, y: -4 }}
              whileTap={{ scale: 0.93 }}
              className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-gradient-to-r from-[#B29DD9] to-[#C5D4F5] text-white font-semibold shadow-xl hover:shadow-2xl"
            >
              <ArrowDownTrayIcon className="h-6 w-6" />
              Descargar APK 🚀
            </motion.a>
            <p className="text-gray-600 mt-3 text-sm">
              También disponible como <span className="font-semibold text-[#A88BE3]">PWA</span> 📲
            </p>
          </motion.div>
        </div>

        {/* ------------------ DERECHA (AUTO-CAMBIO) ------------------ */}
        <motion.div
          className="relative w-full max-w-md h-[360px] md:h-[460px]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          {PREVIEWS.map((img, i) => {
            const POS = [
              "-rotate-6 -left-6 top-10",
              "rotate-3 right-0 top-2 z-30",
              "rotate-1 left-3 bottom-8 z-20",
              "-rotate-2 right-6 bottom-0 z-10",
            ];

            const isActive = i === active; // ⭐ imagen visible

            return (
              <motion.img
                key={i}
                custom={i}
                variants={floatVariant}
                initial="initial"
                animate={{
                  opacity: isActive ? 1 : 0,
                  scale: isActive ? 1 : 0.9,
                  y: isActive ? 0 : 10,
                }}
                src={img.src}
                alt={img.alt}
                draggable={false}
                className={`absolute rounded-3xl border border-white/60 shadow-2xl w-40 h-72 md:w-56 md:h-[20rem] object-cover ${POS[i]}`}
                transition={{
                  duration: 0.8,
                  ease: "easeInOut",
                }}
                whileHover={{ scale: 1.1, y: -8, rotate: 0 }}
              />
            );
          })}
        </motion.div>
      </div>

      {/* Línea final */}
      <div className="relative z-10 mt-14 h-px w-full bg-gradient-to-r from-transparent via-[#B29DD9]/40 to-transparent" />
    </section>
  );
}

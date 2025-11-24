// src/components/Descubrir/DescubrirApp.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  DevicePhoneMobileIcon,
  CubeTransparentIcon,
  HeartIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/solid";

// Mockups de app
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

// ⭐ Textos estilo Apple
const FEATURES = [
  {
    icon: HeartIcon,
    title: "Bienestar que te acompaña",
    text: "Ejercicios breves, respiración consciente y herramientas para tu equilibrio emocional diario.",
  },
  {
    icon: CubeTransparentIcon,
    title: "Experiencias en AR",
    text: "Explora espacios inmersivos que reflejan calma, energía y enfoque.",
  },
  {
    icon: DevicePhoneMobileIcon,
    title: "Diseñada para tu estilo de vida",
    text: "Funciona como PWA o app móvil. Rápida, ligera y siempre contigo.",
  },
];

const PREVIEWS = [
  { src: mockHome, alt: "Pantalla de inicio" },
  { src: mockEmociones, alt: "Pantalla emociones" },
  { src: mockChat, alt: "Pantalla chat" },
  { src: mockPerfil, alt: "Pantalla perfil" },
];

// ⭐ NUEVO → Avatares flotantes alrededor
const AVATARES = [
  avatarAnsiedad,
  avatarEstres,
  avatarMiedo,
  avatarEnojo,
  avatarNeutral,
  avatarTristeza,
];

// 🍃 Efecto flotante Apple
const floatVariant = {
  initial: { opacity: 0, y: 40, scale: 0.95 },
  animate: (i) => ({
    opacity: 1,
    y: [0, -12, 0],
    rotate: [0, i % 2 ? -2 : 2, 0],
    scale: 1,
    transition: {
      y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
      rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
      opacity: { delay: i * 0.15, duration: 0.6 },
    },
  }),
};

export default function DescubrirApp() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setActive((prev) => (prev + 1) % PREVIEWS.length),
      4000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="descubrir-app"
      className="relative max-w-7xl mx-auto px-6 py-24 overflow-hidden"
    >
      {/* 🌈 Fondo Premium Vision Pro */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br
                   from-[#DCCBFF]/40 via-[#C7D9FF]/30 to-[#B8F0FF]/40
                   blur-[140px] opacity-80"
        animate={{ opacity: [0.6, 0.9, 0.6], scale: [1, 1.04, 1] }}
        transition={{ duration: 18, repeat: Infinity }}
      />

      {/* ✨ Halo lateral */}
      <motion.div
        className="absolute top-1/3 right-0 w-96 h-96 rounded-full 
                   bg-[#A78BFA]/30 blur-[160px]"
        animate={{ x: [0, -25, 0], y: [0, 20, 0] }}
        transition={{ duration: 16, repeat: Infinity }}
      />

      {/* ========================= */}
      {/*    GRID PRINCIPAL        */}
      {/* ========================= */}
      <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">

        {/* ------------------ IZQUIERDA ------------------ */}
        <div className="space-y-8">

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full
                       bg-white/60 backdrop-blur-xl px-4 py-1
                       text-xs text-[#6A42D9] font-semibold
                       border border-white/50 shadow-sm"
          >
            <CubeTransparentIcon className="h-4 w-4" />
            AR • Bienestar • Inteligencia Emocional
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold 
                       text-[#1A1B2E] leading-tight tracking-tight"
          >
            Emonical
            <span className="block mt-1 bg-gradient-to-r
                             from-[#A78BFA] to-[#80AFFF]
                             bg-clip-text text-transparent drop-shadow">
              Móvil
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-700 text-lg leading-relaxed max-w-lg"
          >
            Reconecta contigo. Emociones, actividades guiadas, AR y chat terapéutico  
            en una experiencia fluida, suave y elegante.
          </motion.p>

          {/* CARDS */}
          <div className="grid gap-5">
            {FEATURES.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  whileHover={{ scale: 1.03, x: 4 }}
                  className="flex gap-4 items-start rounded-2xl
                             bg-white/70 backdrop-blur-2xl 
                             border border-white/30 
                             px-6 py-5 shadow-[0_12px_40px_rgba(0,0,0,0.06)]"
                >
                  <div className="h-12 w-12 rounded-2xl bg-[#EFE9FF]
                                  flex items-center justify-center shadow-inner">
                    <Icon className="h-6 w-6 text-[#8F6AFD]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#2D2D2D]">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.text}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA */}
          <motion.a
            href="/emonical.apk"
            download
            whileHover={{ scale: 1.06, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-9 py-3.5 rounded-full
                       bg-black text-white font-semibold
                       shadow-[0_8px_20px_rgba(0,0,0,0.25)]
                       hover:bg-[#1A1A1A] transition-all"
          >
            <ArrowDownTrayIcon className="h-6 w-6" />
            Descargar APK
          </motion.a>

          <p className="text-gray-600 text-sm pt-2">
            También disponible como PWA 📲
          </p>
        </div>

        {/* ------------------ DERECHA CON MOCKUPS ------------------ */}
        <motion.div className="relative w-full max-w-md h-[420px] md:h-[500px]">

          {/* 🌟 AVATARES FLOTANTES */}
          {AVATARES.map((src, i) => {
            const positions = [
              "top-0 left-10",
              "top-6 right-6",
              "top-1/2 -left-6",
              "bottom-10 left-3",
              "bottom-0 right-10",
              "top-1/3 -right-10"
            ];
            return (
              <motion.img
                key={i}
                custom={i}
                variants={floatVariant}
                initial="initial"
                animate="animate"
                src={src}
                alt="Emonical Avatar"
                className={`absolute w-20 h-20 md:w-24 md:h-24 opacity-80 
                            drop-shadow-xl ${positions[i]}`}
              />
            );
          })}

          {/* Mockups principales */}
          {PREVIEWS.map((img, i) => {
            const positions = [
              "-rotate-6 -left-6 top-12",
              "rotate-3 right-0 top-4 z-30",
              "rotate-1 left-2 bottom-10 z-20",
              "-rotate-2 right-6 bottom-3 z-10",
            ];

            return (
              <motion.img
                key={i}
                custom={i}
                variants={floatVariant}
                initial="initial"
                animate={{
                  opacity: active === i ? 1 : 0,
                  scale: active === i ? 1 : 0.92,
                }}
                src={img.src}
                alt={img.alt}
                draggable={false}
                className={`absolute rounded-3xl border border-white/60
                            shadow-[0_20px_60px_rgba(0,0,0,0.15)]
                            w-44 h-80 md:w-60 md:h-[22rem] object-cover
                            ${positions[i]}`}
                whileHover={{ scale: 1.05, rotate: 0 }}
              />
            );
          })}
        </motion.div>
      </div>

      {/* Línea final */}
      <div className="relative z-10 mt-20 h-px w-full 
                      bg-gradient-to-r from-transparent via-[#A78BFA]/40 to-transparent" />
    </section>
  );
}

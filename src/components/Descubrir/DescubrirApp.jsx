import { motion } from "framer-motion";
import {
  DevicePhoneMobileIcon,
  CubeTransparentIcon,
  HeartIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/solid";

const FEATURES = [
  {
    icon: HeartIcon,
    title: "Crecimiento emocional",
    text:
      "Sesiones guiadas, respiración consciente y actividades breves para acompañarte día a día.",
  },
  {
    icon: CubeTransparentIcon,
    title: "Realidad Aumentada (AR)",
    text:
      "Explora entornos inmersivos que representan calma, energía o enfoque según cómo te sientas.",
  },
  {
    icon: DevicePhoneMobileIcon,
    title: "Lista para usar en tu teléfono",
    text:
      "Instálala como PWA desde el navegador o descarga el APK seguro, sin depender de Play Store.",
  },
];

const PREVIEWS = [
  { src: "/assets/mockup1.png", alt: "Vista de pantalla principal de Emonical" },
  { src: "/assets/mockup2.png", alt: "Ejercicio guiado de bienestar en Emonical" },
  { src: "/assets/mockup3.png", alt: "Sección de seguimiento emocional en Emonical" },
];

export default function DescubrirApp() {
  return (
    <section
      id="descubrir-app"
      className="relative max-w-7xl mx-auto px-6 py-16 md:py-20 overflow-hidden"
    >
      {/* Fondo suave tipo aurora */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#B4C5F7]/40 via-[#B29DD9]/30 to-[#CEEBF8]/40 blur-3xl opacity-70"
        animate={{ opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Halo detrás de los mockups */}
      <div className="pointer-events-none absolute right-0 top-1/3 h-72 w-72 rounded-full bg-[#B29DD9]/40 blur-3xl opacity-60" />

      {/* Contenido principal: texto + mockups lado a lado */}
      <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center mb-16">
        {/* Columna izquierda: texto */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1 text-xs font-semibold text-[#7356B8] shadow-sm border border-white/60"
          >
            <CubeTransparentIcon className="h-4 w-4" />
            Bienestar + Realidad Aumentada + PWA
          </motion.div>

          {/* 👇 TÍTULO MEJORADO Y MÁS LEGIBLE */}
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#22223B] leading-tight"
          >
            Descubre{" "}
            <span className="relative inline-block">
              {/* halo detrás del texto */}
              <span
                className="absolute inset-0 rounded-full bg-gradient-to-r from-[#B29DD9] to-[#C5D4F5] opacity-60 blur-sm"
                aria-hidden="true"
              />
              {/* texto con buen contraste y sombra */}
              <span className="relative px-1 text-[#31245A] drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)]">
                Emonical&nbsp;Móvil
              </span>
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-700 text-base md:text-lg leading-relaxed"
          >
            Lleva tu bienestar emocional a cualquier lugar: ejercicios rápidos,
            experiencias en realidad aumentada y acompañamiento amoroso desde tu
            celular.
          </motion.p>

          {/* Features como lista compacta */}
          <div className="grid gap-4">
            {FEATURES.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="flex gap-3 items-start rounded-2xl bg-white/75 border border-white/60 px-4 py-3 shadow-sm"
                >
                  <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-[#F3EEFF]">
                    <Icon className="h-5 w-5 text-[#B29DD9]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#2D2D2D]">
                      {card.title}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {card.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Botón principal */}
          <div className="pt-2">
            <motion.a
              href="/emonical.apk"
              download
              aria-label="Descargar APK de Emonical"
              whileHover={{ scale: 1.04, translateY: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#B29DD9] via-[#C5D4F5] to-[#B4C5F7] text-white font-semibold px-7 py-3 rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              <ArrowDownTrayIcon className="h-5 w-5" />
              Descargar APK de Emonical
            </motion.a>
            <p className="text-gray-600 mt-3 text-xs md:text-sm">
              También puedes{" "}
              <span className="text-[#B29DD9] font-semibold">
                instalarla como PWA
              </span>{" "}
              desde el menú de tu navegador 📱
            </p>
          </div>
        </div>

        {/* Columna derecha: mockups en “fan” */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex justify-center md:justify-end"
        >
          <div className="relative w-full max-w-md h-[340px] md:h-[420px]">
            {PREVIEWS.map((img, i) => {
              const base =
                "absolute rounded-3xl shadow-xl border border-white/70 bg-white/80";
              const positions = [
                "top-10 -left-2 rotate-[-8deg]",
                "top-3 right-0 rotate-[4deg] z-20",
                "bottom-2 left-6 rotate-[1deg]",
              ];
              const sizes =
                "w-44 h-80 md:w-52 md:h-[19rem] object-cover";

              return (
                <motion.div
                  key={img.src}
                  className={`${base} ${positions[i]} overflow-hidden`}
                  whileHover={{ scale: 1.04, y: -4 }}
                  transition={{ duration: 0.25 }}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className={sizes}
                  />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Mini franja inferior (separador suave) */}
      <div className="relative z-10 mt-4 h-px w-full bg-gradient-to-r from-transparent via-[#B29DD9]/40 to-transparent" />
    </section>
  );
}

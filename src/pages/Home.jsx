import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center text-center min-h-[calc(100vh-120px)] px-6 overflow-hidden select-none">

      {/* === Fondo tipo Aurora === */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#C7D5FF]/70 via-[#B4C0FF]/50 to-[#D5B6FF]/70 blur-3xl"
        animate={{ opacity: [0.55, 0.85, 0.55] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* === Glow central suave === */}
      <motion.div
        className="absolute w-[450px] h-[450px] bg-white/20 rounded-full blur-[110px] top-1/3 left-1/2 -translate-x-1/2"
        animate={{ opacity: [0.2, 0.45, 0.2], scale: [1, 1.06, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* === Logo principal === */}
      <motion.img
        src="/assets/emonical-logo.png"
        alt="Logo Emonical"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-40 md:w-52 mb-6 drop-shadow-xl relative z-10"
      />

      {/* === Avatar flotante === */}
      <motion.img
        src="/assets/emonical-avatar.png"
        alt="Avatar Emonical"
        animate={{
          y: [0, -14, 0],
          rotate: [0, 2, -2, 0],
          scale: [1, 1.03, 1],
        }}
        transition={{
          duration: 3.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="w-44 md:w-56 drop-shadow-[0_10px_25px_rgba(140,95,255,0.4)] relative z-10"
      />

      {/* === Título y subtítulo === */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.9 }}
        className="mt-8 max-w-lg relative z-10"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#1F1B39] leading-snug mb-4">
          Bienvenido a{" "}
          <span className="bg-gradient-to-r from-[#9B6BFF] to-[#B4C5F7] bg-clip-text text-transparent">
            Emonical Foro
          </span>
        </h1>

        <p className="text-[#4A4A4A] text-base md:text-lg leading-relaxed">
          Un espacio donde puedes expresarte, compartir experiencias
          y encontrar apoyo emocional en un ambiente seguro y positivo.
        </p>
      </motion.div>

      {/* === Botones principales === */}
      <motion.div
        className="mt-10 flex flex-col sm:flex-row gap-4 relative z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        {/* === Botón Foro === */}
        <a
          href="/foro"
          className="group relative inline-flex items-center justify-center px-8 py-3 rounded-2xl text-lg font-semibold text-white overflow-hidden shadow-[0_6px_25px_rgba(140,95,255,0.45)] transition-all duration-300"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-[#9B6BFF] via-[#B4C5F7] to-[#D5B6FF] opacity-90 group-hover:opacity-100 transition-all duration-500" />
          <motion.span
            className="absolute w-44 h-44 bg-white/25 blur-2xl rounded-full opacity-0 group-hover:opacity-70"
            animate={{ scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="relative z-10">Entrar al Foro</span>
        </a>

        {/* === Botón Descubrir === */}
        <a
          href="/descubrir"
          className="group relative inline-flex items-center justify-center px-8 py-3 rounded-2xl text-lg font-semibold 
                     text-[#2B2B2B] bg-white/70 backdrop-blur-xl border border-white/40 
                     shadow-md hover:shadow-xl hover:text-[#9B6BFF] transition-all duration-300"
        >
          <span className="relative z-10">Descubrir App Emonical</span>
        </a>
      </motion.div>

      {/* === Frase inferior === */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-10 text-sm text-gray-600 italic relative z-10"
      >
        “Un paso hacia una mente más tranquila comienza con una conversación.”
      </motion.p>
    </div>
  );
}

import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center text-center min-h-[calc(100vh-120px)] px-6 overflow-hidden select-none">
      {/* === Fondo animado tipo aurora === */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#B4C5F7]/70 via-[#B29DD9]/50 to-[#CEEBF8]/80 blur-3xl"
        animate={{ opacity: [0.6, 0.8, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* === Burbuja de luz ambiental === */}
      <motion.div
        className="absolute w-[420px] h-[420px] bg-white/25 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{ scale: [1, 1.05, 1], opacity: [0.25, 0.5, 0.25] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* === Logo principal === */}
      <motion.img
        src="/assets/emonical-logo.png"
        alt="Logo Emonical"
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-40 md:w-52 mb-6 drop-shadow-lg relative z-10"
      />

      {/* === Burbuja central flotante === */}
      <motion.img
        src="/assets/emonical-avatar.png"
        alt="Avatar Emonical"
        animate={{
          y: [0, -14, 0],
          rotate: [0, 2, -2, 0],
          scale: [1, 1.03, 1],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="w-44 md:w-56 drop-shadow-2xl relative z-10"
      />

      {/* === Texto de bienvenida === */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.9 }}
        className="mt-8 max-w-lg relative z-10"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-[#2D2D2D] leading-snug mb-4">
          Bienvenido a{" "}
          <span className="bg-gradient-to-r from-[#B29DD9] to-[#B4C5F7] bg-clip-text text-transparent">
            Emonical Foro
          </span>
        </h1>

        <p className="text-gray-700 text-base md:text-lg leading-relaxed">
          Un espacio digital creado para cuidar tu mente, compartir experiencias
          y descubrir herramientas que fortalecen tu bienestar emocional.
        </p>
      </motion.div>

      {/* === Botones principales === */}
      <motion.div
        className="mt-10 flex flex-col sm:flex-row gap-4 relative z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        {/* --- Botón Foro --- */}
        <a
          href="/foro"
          className="group relative inline-flex items-center justify-center px-8 py-3 rounded-2xl text-lg font-semibold text-white overflow-hidden shadow-[0_4px_20px_rgba(178,157,217,0.4)] transition-all duration-300"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-[#B29DD9] via-[#B4C5F7] to-[#CEEBF8] opacity-90 group-hover:opacity-100 transition-all duration-500" />
          <motion.span
            className="absolute w-40 h-40 bg-white/30 blur-2xl rounded-full opacity-0 group-hover:opacity-70"
            animate={{ scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="relative z-10">Entrar al Foro</span>
        </a>

        {/* --- Botón Descubrir App --- */}
        <a
          href="/descubrir"
          className="group relative inline-flex items-center justify-center px-8 py-3 rounded-2xl text-lg font-semibold text-[#2D2D2D] bg-white/70 backdrop-blur-xl border border-white/40 shadow-md hover:shadow-xl hover:text-[#B29DD9] transition-all duration-300"
        >
          <span className="relative z-10">Descubrir App Emonical</span>
        </a>
      </motion.div>

      {/* === Mensaje inferior === */}
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

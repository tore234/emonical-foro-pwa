import Login from "../components/Usuario/Login";
import { motion } from "framer-motion";

export default function Perfil() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6 py-10
                    bg-gradient-to-b from-[#B4C5F7] via-[#C5D4F5] to-[#CEEBF8]">
      
      {/* Avatar emocional */}
      <motion.img
        src="/assets/emonical-avatar.png"
        alt="Avatar emocional"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="w-28 h-28 mb-6 drop-shadow-lg bubble-glow"
      />

      {/* Título y descripción */}
      <motion.h2
        className="text-3xl font-bold text-emonical-dark mb-3 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Tu cuenta en <span className="text-emonical-lilac">Emonical Foro</span>
      </motion.h2>

      <p className="text-gray-700 text-center max-w-md mb-8 leading-relaxed">
        Accede o crea tu cuenta para guardar tus publicaciones, comentar y conectar con otros usuarios.
      </p>

      {/* Login */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="w-full max-w-sm"
      >
        <Login />
      </motion.div>
    </div>
  );
}

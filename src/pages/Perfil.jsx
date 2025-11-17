// src/pages/Perfil.jsx
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import Login from "../components/Usuario/Login";
import PerfilCard from "../components/Usuario/PerfilCard";

export default function Perfil() {
  const { user, loadingAuth, logout } = useAuth();

  // Mientras Firebase responde si hay usuario o no
  if (loadingAuth) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6 py-10 bg-gradient-to-b from-[#B4C5F7] via-[#C5D4F5] to-[#CEEBF8]">
        <p className="text-gray-700">Verificando sesión...</p>
      </div>
    );
  }

  const isLogged = Boolean(user);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6 py-10
                 bg-gradient-to-b from-[#B4C5F7] via-[#C5D4F5] to-[#CEEBF8]"
    >
      {/* Avatar emocional */}
      <motion.img
        src="/assets/emonical-avatar.png"
        alt="Avatar emocional"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="w-28 h-28 mb-6 drop-shadow-lg bubble-glow"
      />

      {/* Título + texto cambian según si hay sesión o no */}
      <motion.h2
        className="text-3xl font-bold text-emonical-dark mb-3 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {isLogged ? (
          <>
            Hola,{" "}
            <span className="text-emonical-lilac">
              {user.email || "Invitado"}
            </span>
          </>
        ) : (
          <>
            Tu cuenta en{" "}
            <span className="text-emonical-lilac">Emonical Foro</span>
          </>
        )}
      </motion.h2>

      <p className="text-gray-700 text-center max-w-md mb-8 leading-relaxed">
        {isLogged
          ? "Aquí puedes ver los datos de tu cuenta y gestionar tu sesión en Emonical Foro."
          : "Accede o crea tu cuenta para guardar tus publicaciones, comentar y conectar con otros usuarios."}
      </p>

      {/* Contenido principal según estado */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="w-full max-w-lg"
      >
        {isLogged ? (
          <div className="space-y-5">
            {/* Tarjeta de perfil */}
            <PerfilCard user={user} />

            {/* Acciones de sesión */}
            <div className="flex flex-col sm:flex-row gap-3 justify-between">
              <button
                onClick={logout}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full text-sm font-semibold text-red-500 border border-red-300 bg-white hover:bg-red-50 transition-colors"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        ) : (
          // Si NO está logueado, mostramos tu Login bonito
          <Login />
        )}
      </motion.div>
    </div>
  );
}

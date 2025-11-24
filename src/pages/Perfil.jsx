// src/pages/Perfil.jsx
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import Login from "../components/Usuario/Login";
import PerfilCard from "../components/Usuario/PerfilCard";

export default function Perfil() {
  const { user, loadingAuth, logout } = useAuth();

  // Mientras Firebase verifica sesión
  if (loadingAuth) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6 py-10 bg-gradient-to-b from-[#B4C5F7] via-[#C5D4F5] to-[#CEEBF8]">
        <p className="text-[#4A4A4A] font-medium">Verificando sesión...</p>
      </div>
    );
  }

  const isLogged = Boolean(user);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6 py-10 bg-gradient-to-b from-[#B4C5F7] via-[#C5D4F5] to-[#CEEBF8]">
      
      {/* Avatar emocional animado */}
      <motion.img
        src="/assets/emonical-avatar.png"
        alt="Avatar emocional"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="w-28 h-28 mb-6 drop-shadow-xl"
      />

      {/* Título dinámico */}
      <motion.h2
        className="text-3xl font-extrabold tracking-tight text-[#2A2344] mb-3 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {isLogged ? (
          <>
            Hola,{" "}
            <span className="text-[#9c6df5]">
              {user.email || "Invitad@"}
            </span>
          </>
        ) : (
          <>
            Tu cuenta en{" "}
            <span className="text-[#9c6df5]">Emonical Foro</span>
          </>
        )}
      </motion.h2>

      {/* Subtexto dinámico */}
      <p className="text-[#4A4A4A] text-center max-w-md mb-8 leading-relaxed">
        {isLogged
          ? "Aquí puedes ver los datos de tu cuenta y gestionar tu sesión en Emonical Foro 💜"
          : "Accede o crea tu cuenta para guardar tus publicaciones, comentar y conectar con otros usuarios 🌿"}
      </p>

      {/* Sección principal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.25, duration: 0.6 }}
        className="w-full max-w-lg"
      >
        {isLogged ? (
          <div className="space-y-5">
            
            {/* Tarjeta de perfil */}
            <PerfilCard user={user} />

            {/* Botón cerrar sesión */}
            <div className="flex flex-col sm:flex-row gap-3 justify-between">
              <button
                onClick={logout}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full text-sm font-semibold text-red-500 border border-red-300 bg-white shadow hover:bg-red-50 transition-all"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        ) : (
          /* Formulario Login */
          <Login />
        )}
      </motion.div>
    </div>
  );
}

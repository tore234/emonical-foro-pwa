import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Foro from "./pages/Foro";
import Noticias from "./pages/Noticias";
import Perfil from "./pages/Perfil";
import Descubrir from "./pages/Descubrir"; // ✅ Asegúrate de tener esta página creada
import { motion, AnimatePresence } from "framer-motion";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import {
  UserCircleIcon,
  HomeIcon,
  ChatBubbleBottomCenterTextIcon,
  NewspaperIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

function App() {
  const [user] = useAuthState(auth);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setMenuOpen(false);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#B4C5F7] via-[#C5D4F5] to-[#CEEBF8] text-[#2D2D2D] font-[Poppins] transition-all duration-300">
      {/* === NAVBAR === */}
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between px-6 py-3 bg-white/60 backdrop-blur-xl shadow-[0_2px_12px_rgba(178,157,217,0.25)] sticky top-0 z-50 border-b border-white/40 rounded-b-2xl"
      >
        {/* --- Logo --- */}
        <Link to="/" className="flex items-center space-x-2 group">
          <img
            src="/assets/emonical-logo.png"
            alt="Emonical Logo"
            className="h-8 w-auto drop-shadow-md transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* --- Botón Hamburguesa --- */}
        <button
          className="md:hidden p-2 rounded-md text-[#2D2D2D] hover:bg-white/40 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>

        {/* --- Menú Desktop --- */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
          {[
            { to: "/", icon: HomeIcon, label: "Inicio" },
            { to: "/descubrir", icon: SparklesIcon, label: "Descubrir" },
            { to: "/foro", icon: ChatBubbleBottomCenterTextIcon, label: "Foro" },
            { to: "/noticias", icon: NewspaperIcon, label: "Noticias" },
            { to: "/perfil", icon: UserCircleIcon, label: "Perfil" },
          ].map(({ to, icon: Icon, label }) => (
            <Link
              key={to}
              to={to}
              className="flex items-center space-x-1 hover:text-[#B29DD9] transition-all hover:scale-105"
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </Link>
          ))}
        </div>
      </motion.nav>

      {/* === MENÚ MÓVIL === */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/50 rounded-b-3xl text-center py-4 flex flex-col space-y-3 z-40"
          >
            {[
              { to: "/", label: "Inicio" },
              { to: "/descubrir", label: "Descubrir" },
              { to: "/foro", label: "Foro" },
              { to: "/noticias", label: "Noticias" },
              { to: "/perfil", label: "Perfil" },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                className="text-[#2D2D2D] hover:text-[#B29DD9] font-medium tracking-wide transition"
              >
                {label}
              </Link>
            ))}

            {user ? (
              <button
                onClick={handleLogout}
                className="flex justify-center items-center gap-1 text-red-600 hover:text-red-800 transition mt-2"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                Cerrar sesión
              </button>
            ) : (
              <span className="text-gray-500 italic">No has iniciado sesión</span>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* === CONTENIDO === */}
      <motion.main
        className="flex-grow p-6 md:p-10 relative z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/descubrir" element={<Descubrir />} />
          <Route path="/foro" element={<Foro />} />
          <Route path="/noticias" element={<Noticias />} />
          <Route path="/perfil" element={<Perfil />} />
        </Routes>
      </motion.main>

      {/* === FOOTER === */}
      <footer className="bg-white/60 backdrop-blur-lg border-t border-white/40 py-3 text-sm flex flex-col sm:flex-row items-center justify-center gap-3 shadow-[inset_0_2px_10px_rgba(178,157,217,0.1)]">
        {user ? (
          <>
            <img
              src={user.photoURL || "/assets/emonical-avatar.png"}
              alt="Avatar usuario"
              className="w-8 h-8 rounded-full border border-[#B29DD9] shadow-sm"
            />
            <span className="text-[#2D2D2D]">
              Sesión activa:{" "}
              <strong className="text-[#B29DD9]">
                {user.displayName || user.email}
              </strong>
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-red-600 hover:text-red-800 transition"
            >
              <ArrowRightOnRectangleIcon className="h-4 w-4" />
              Cerrar
            </button>
          </>
        ) : (
          <span className="text-gray-500 italic">No has iniciado sesión</span>
        )}
      </footer>
    </div>
  );
}

export default App;

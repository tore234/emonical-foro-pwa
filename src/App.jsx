import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Foro from "./pages/Foro";
import Noticias from "./pages/Noticias";
import Perfil from "./pages/Perfil";
import Descubrir from "./pages/Descubrir";

import { motion, AnimatePresence } from "framer-motion";

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

import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useTheme } from "./context/ThemeContext";
import { useAuth } from "./context/AuthContext";

// ✅ IMPORTACIÓN CORRECTA DE LOGOS
import logoDark from "./assets/emonical-logo-light.png";
import logoLight from "./assets/emonical-logo-dark.png";

function App() {
  const { user, loadingAuth, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setMenuOpen(false);
  };

  if (loadingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-main)]">
        <div className="px-5 py-3 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 text-sm text-[var(--text-main)] flex items-center gap-2">
          <SparklesIcon className="h-5 w-5 animate-spin text-[var(--glow-purple)]" />
          Verificando sesión...
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col font-[Poppins] transition-all"
      style={{
        background: `linear-gradient(135deg, var(--bg-main), var(--bg-deep))`,
        color: "var(--text-main)",
      }}
    >

      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="
          flex items-center justify-between 
          px-6 py-4 sticky top-0 z-50 
          backdrop-blur-2xl border-b
          transition-all
        "
        style={{
          background: "var(--card-bg)",
          borderColor: "var(--card-border)",
          boxShadow: `0 0 22px var(--glow-purple)`,
        }}
      >

        {/* LOGO AUTO-SWITCH FUNCIONAL */}
        <Link to="/" className="flex items-center space-x-2 group">
          <img
            src={theme === "dark" ? logoDark : logoLight}
            alt="Emonical"
            className="
              h-9 md:h-10
              transition-all duration-300 
              group-hover:scale-110

              brightness-110 saturate-150
              drop-shadow-[0_0_6px_rgba(0,123,255,0.35)]
              drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]

              dark:brightness-125 dark:saturate-150
              dark:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]
            "
          />
        </Link>

        {/* BOTÓN MOBILE */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-white/10 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <XMarkIcon className="h-7 w-7" /> : <Bars3Icon className="h-7 w-7" />}
        </button>

        {/* MENU DESKTOP */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
          {[
            { to: "/", icon: HomeIcon, label: "Inicio" },
            { to: "/descubrir", icon: SparklesIcon, label: "Descubrir" },
            { to: "/foro", icon: ChatBubbleBottomCenterTextIcon, label: "Foro" },
            { to: "/noticias", icon: NewspaperIcon, label: "Noticias" },
            { to: "/perfil", icon: UserCircleIcon, label: user ? "Perfil" : "Ingresar" },
          ].map(({ to, icon: Icon, label }) => (
            <Link
              key={to}
              to={to}
              className="flex items-center gap-1 hover:text-[var(--glow-blue)] transition"
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          ))}

          {/* TEMA */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border transition hover:scale-105"
            style={{
              background: "var(--card-bg)",
              borderColor: "var(--card-border)",
            }}
          >
            {theme === "dark" ? (
              <SunIcon className="h-5 w-5 text-yellow-300" />
            ) : (
              <MoonIcon className="h-5 w-5 text-indigo-500" />
            )}
          </button>

          {/* LOGOUT */}
          {user && (
            <button
              onClick={handleLogout}
              className="text-pink-300 hover:text-pink-400 flex items-center gap-1"
            >
              <ArrowRightOnRectangleIcon className="h-4 w-4" /> Salir
            </button>
          )}
        </div>
      </motion.nav>

      {/* MENU MOBILE */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            className="
              md:hidden flex flex-col gap-5 py-5 
              text-center backdrop-blur-xl border-b
              shadow-lg
            "
            style={{
              background: "var(--card-bg)",
              borderColor: "var(--card-border)",
            }}
          >
            {[
              { to: "/", label: "Inicio", icon: HomeIcon },
              { to: "/descubrir", label: "Descubrir", icon: SparklesIcon },
              { to: "/foro", label: "Foro", icon: ChatBubbleBottomCenterTextIcon },
              { to: "/noticias", label: "Noticias", icon: NewspaperIcon },
              { to: "/perfil", label: user ? "Perfil" : "Ingresar", icon: UserCircleIcon },
            ].map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className="flex items-center justify-center gap-2 text-[var(--text-main)] font-medium hover:text-[var(--glow-blue)] transition"
                onClick={() => setMenuOpen(false)}
              >
                <Icon className="h-5 w-5" />
                {label}
              </Link>
            ))}

            <button
              onClick={toggleTheme}
              className="mx-auto mt-2 px-6 py-2 rounded-xl border text-sm hover:scale-105 transition"
              style={{
                background: "var(--card-bg)",
                borderColor: "var(--card-border)",
              }}
            >
              {theme === "dark" ? "☀️ Modo Claro" : "🌙 Modo Oscuro"}
            </button>

            {user && (
              <button
                onClick={handleLogout}
                className="text-pink-300 mt-3 flex items-center justify-center gap-1"
              >
                <ArrowRightOnRectangleIcon className="h-4 w-4" /> Salir
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* CONTENIDO */}
      <motion.main
        className="flex-grow px-4 md:px-8 pt-6"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/descubrir" element={<Descubrir />} />
          <Route path="/foro" element={<Foro />} />
          <Route path="/noticias" element={<Noticias />} />
          <Route path="/perfil" element={<Perfil />} />
        </Routes>
      </motion.main>
    </div>
  );
}

export default App;

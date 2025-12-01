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

  const currentYear = new Date().getFullYear();
  const isDark = theme === "dark";

  const handleLogout = async () => {
    await logout();
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = () => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
      {/* NAVBAR PRINCIPAL FIJO */}
      <motion.nav
        initial={{ y: -18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="
          fixed top-0 left-0 right-0 z-50
          flex items-center justify-between 
          px-4 sm:px-6 py-3 md:py-4
          backdrop-blur-2xl border-b
          transition-all
        "
        style={{
          background: isDark
            ? "linear-gradient(135deg, rgba(15,23,42,0.96), rgba(15,23,42,0.9))"
            : "linear-gradient(135deg, rgba(255,255,255,0.96), rgba(248,250,252,0.9))",
          borderColor: "var(--card-border)",
          boxShadow: isDark
            ? "0 0 22px var(--glow-purple)"
            : "0 0 18px rgba(148,163,184,0.45)",
        }}
      >
        {/* LOGO AUTO-SWITCH FUNCIONAL */}
        <Link
          to="/"
          onClick={handleNavClick}
          className="flex items-center space-x-2 group"
        >
          <img
            src={theme === "dark" ? logoDark : logoLight}
            alt="Emonical"
            className="
              h-8 md:h-10
              transition-all duration-300 
              group-hover:scale-110
              brightness-110 saturate-150
              drop-shadow-[0_0_6px_rgba(0,123,255,0.35)]
              dark:brightness-125 dark:saturate-150
              dark:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]
            "
          />
        </Link>

        {/* BOTÓN MOBILE */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-white/10 transition"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? (
            <XMarkIcon className="h-7 w-7" />
          ) : (
            <Bars3Icon className="h-7 w-7" />
          )}
        </button>

        {/* MENU DESKTOP */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8 text-sm font-medium">
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
              onClick={handleNavClick}
              className="
                flex items-center gap-1.5 px-2 py-1 rounded-xl
                hover:text-[var(--glow-blue)]
                hover:bg-white/5
                transition
              "
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          ))}

          {/* TEMA */}
          <button
            onClick={toggleTheme}
            className="
              p-2 rounded-xl border transition hover:scale-105
              flex items-center justify-center
            "
            style={{
              background: "var(--card-bg)",
              borderColor: "var(--card-border)",
            }}
          >
            {isDark ? (
              <SunIcon className="h-5 w-5 text-yellow-300" />
            ) : (
              <MoonIcon className="h-5 w-5 text-indigo-500" />
            )}
          </button>

          {/* LOGOUT */}
          {user && (
            <button
              onClick={handleLogout}
              className="text-pink-300 hover:text-pink-400 flex items-center gap-1 text-sm"
            >
              <ArrowRightOnRectangleIcon className="h-4 w-4" /> Salir
            </button>
          )}
        </div>
      </motion.nav>

      {/* MENU MOBILE (FIJO BAJO EL NAV) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            className="
              md:hidden fixed top-[56px] sm:top-[64px] left-0 right-0 z-40
              flex flex-col gap-4 py-4 
              text-center backdrop-blur-xl border-b
              shadow-lg
            "
            style={{
              background: isDark
                ? "rgba(15,23,42,0.96)"
                : "rgba(255,255,255,0.96)",
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
                className="
                  flex items-center justify-center gap-2 
                  text-[var(--text-main)] font-medium 
                  hover:text-[var(--glow-blue)] transition
                "
                onClick={handleNavClick}
              >
                <Icon className="h-5 w-5" />
                {label}
              </Link>
            ))}

            <button
              onClick={() => {
                toggleTheme();
              }}
              className="mx-auto mt-1 px-6 py-2 rounded-xl border text-sm hover:scale-105 transition flex items-center gap-2"
              style={{
                background: "var(--card-bg)",
                borderColor: "var(--card-border)",
              }}
            >
              {isDark ? (
                <>
                  <SunIcon className="h-4 w-4 text-yellow-300" />
                  Modo claro
                </>
              ) : (
                <>
                  <MoonIcon className="h-4 w-4 text-indigo-500" />
                  Modo oscuro
                </>
              )}
            </button>

            {user && (
              <button
                onClick={handleLogout}
                className="text-pink-300 mt-2 flex items-center justify-center gap-1 text-sm"
              >
                <ArrowRightOnRectangleIcon className="h-4 w-4" /> Salir
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* CONTENIDO (padding-top para no quedar debajo del navbar fijo) */}
      <motion.main
        className="flex-grow px-4 md:px-8 pt-24 md:pt-28 pb-10"
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

      {/* FOOTER – DERECHOS RESERVADOS */}
      <footer
        className="
          w-full px-4 md:px-8 py-4 border-t
          text-xs md:text-sm flex flex-col md:flex-row
          items-center justify-between gap-2
        "
        style={{
          background: isDark
            ? "rgba(15,23,42,0.96)"
            : "rgba(255,255,255,0.96)",
          borderColor: "var(--card-border)",
          color: "var(--text-soft)",
        }}
      >
        <span>© {currentYear} Emonical · Todos los derechos reservados.</span>
        <span className="flex items-center gap-1">
          Desarrollado por
          <span className="font-semibold text-[var(--glow-blue)]">
            DKT Devs
          </span>
          💜
        </span>
      </footer>
    </div>
  );
}

export default App;

import { useTheme } from "../../context/ThemeContext";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.88 }}
      className="
        relative p-3 rounded-full
        transition-all duration-300
        shadow-[0_0_18px_rgba(150,80,255,0.25)]
        bg-white/30 backdrop-blur-xl border border-white/40
        
        hover:shadow-[0_0_25px_rgba(150,80,255,0.45)]
        hover:bg-white/40

        dark:bg-black/40 dark:border-white/10
        dark:shadow-[0_0_25px_rgba(255,255,255,0.15)]
        dark:hover:bg-black/60
      "
    >
      {/* Animación de desvanecimiento al cambiar el icono */}
      <motion.div
        key={theme}
        initial={{ opacity: 0, rotate: -40 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 0.3 }}
      >
        {theme === "dark" ? (
          <SunIcon className="h-6 w-6 text-yellow-300 drop-shadow-[0_0_10px_rgba(255,230,100,0.8)]" />
        ) : (
          <MoonIcon className="h-6 w-6 text-purple-600 drop-shadow-[0_0_10px_rgba(150,80,255,0.6)]" />
        )}
      </motion.div>
    </motion.button>
  );
}

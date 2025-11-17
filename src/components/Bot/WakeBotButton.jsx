import { useState } from "react";
import { motion } from "framer-motion";
import {
  SparklesIcon,
  BoltIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";

export default function WakeBotButton() {
  const [estado, setEstado] = useState("idle"); // idle | waking | awake | error

  const despertarBot = async () => {
    setEstado("waking");
    try {
      const res = await fetch("https://armony-backend.onrender.com/ping", {
        method: "GET",
      });

      if (!res.ok) throw new Error("No se pudo conectar al bot");

      const data = await res.json();
      console.log(data);
      setEstado("awake");

      // Volver a estado normal luego de unos segundos
      setTimeout(() => setEstado("idle"), 5000);
    } catch (error) {
      console.error("Error al despertar el bot:", error);
      setEstado("error");
      setTimeout(() => setEstado("idle"), 5000);
    }
  };

  return (
    <motion.button
      onClick={despertarBot}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      className={`flex items-center justify-center gap-2 px-5 py-2 rounded-2xl font-semibold text-white shadow-md transition-all ${
        estado === "waking"
          ? "bg-gradient-to-r from-[#C5D4F5] to-[#B29DD9]"
          : estado === "awake"
          ? "bg-gradient-to-r from-[#B4C5F7] to-[#CEEBF8]"
          : estado === "error"
          ? "bg-gradient-to-r from-red-400 to-pink-400"
          : "bg-gradient-to-r from-[#B29DD9] to-[#B4C5F7] hover:shadow-lg"
      }`}
    >
      {estado === "waking" && (
        <>
          <SparklesIcon className="h-5 w-5 animate-spin text-white" />
          <span>🌙 Despertando al bot emocional...</span>
        </>
      )}
      {estado === "awake" && (
        <>
          <BoltIcon className="h-5 w-5 text-yellow-300" />
          <span>💫 EmonicalBot está despierto</span>
        </>
      )}
      {estado === "error" && (
        <>
          <PowerIcon className="h-5 w-5 text-white" />
          <span>No se pudo conectar 😔</span>
        </>
      )}
      {estado === "idle" && (
        <>
          <PowerIcon className="h-5 w-5 text-white" />
          <span>Despertar Bot ⚡</span>
        </>
      )}
    </motion.button>
  );
}

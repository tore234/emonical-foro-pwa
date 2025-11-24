import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { ForoForm, ForoList } from "../components/Foro";
import WakeBotButton from "../components/Bot/WakeBotButton";

import {
  ChatBubbleOvalLeftEllipsisIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";

// 🌟 Frases motivacionales del bot
const FRASES_BOT = [
  "💫 Respira profundo, este momento también pasará.",
  "🌿 Descansar no es rendirse, es cuidar tu mente.",
  "✨ Un paso pequeño también es progreso.",
  "💜 Cada emoción merece ser escuchada.",
  "🌈 Tu proceso es único y valioso.",
];

function crearMensajeDiario() {
  return {
    id: "bot-" + Date.now(),
    autor: "Emonical Bot 💜",
    titulo: "Mensaje del día",
    texto: FRASES_BOT[Math.floor(Math.random() * FRASES_BOT.length)],
    fecha: new Date().toLocaleDateString("es-MX", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    tipo: "bot",
  };
}

export default function Foro() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let isMounted = true;

    const cargarPosts = async () => {
      try {
        const q = query(collection(db, "comentarios"), orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);

        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        let merged = [...data];

        // Mensaje emocional diario del bot
        if (typeof window !== "undefined") {
          const hoy = new Date().toDateString();
          const ultimaFrase = localStorage.getItem("ultimaFrase");

          if (ultimaFrase !== hoy) {
            merged.unshift(crearMensajeDiario());
            localStorage.setItem("ultimaFrase", hoy);
          }
        }

        if (isMounted) setPosts(merged);
      } catch (error) {
        console.error("Error al cargar posts:", error);
        if (isMounted)
          setErrorMsg("No pudimos cargar las publicaciones. Inténtalo de nuevo 💜");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    cargarPosts();
    return () => (isMounted = false);
  }, []);

  return (
    <section className="relative max-w-6xl mx-auto px-4 sm:px-8 py-16 overflow-hidden">
      
      {/* 💜 Fondo aurora suave */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#D5B6FF]/40 via-[#B4C5F7]/35 to-[#9B6BFF]/30 blur-[120px]"
        animate={{ opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ⭐ Encabezado */}
      <header className="relative z-10 text-center mb-14">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-[#1F1B39] flex justify-center items-center gap-3"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <ChatBubbleOvalLeftEllipsisIcon className="h-10 w-10 text-[#9B6BFF]" />
          Foro Emonical
        </motion.h2>

        <p className="mt-3 text-gray-700 max-w-2xl mx-auto text-base md:text-lg">
          Comparte tus emociones y recibe apoyo de la comunidad 💜
        </p>
      </header>

      {/* 📝 Formulario + Lista */}
      <div className="relative z-10 space-y-12">

        {/* Formulario Glass UI */}
        <div className="bg-white/70 backdrop-blur-2xl rounded-3xl p-6 border border-white/50 shadow-[0_8px_30px_rgba(155,107,255,0.15)]">
          <ForoForm setPosts={setPosts} />
        </div>

        {/* Loader / Error / Posts */}
        {loading ? (
          <motion.div
            className="flex justify-center py-12 text-[#9B6BFF] font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <SparklesIcon className="h-6 w-6 animate-spin mr-2" />
            Cargando publicaciones...
          </motion.div>
        ) : errorMsg ? (
          <div className="text-center text-sm text-red-500 bg-white/80 backdrop-blur-xl rounded-2xl px-4 py-3 max-w-md mx-auto shadow">
            {errorMsg}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center text-gray-600 bg-white/70 backdrop-blur-xl rounded-2xl px-4 py-6 max-w-md mx-auto shadow">
            No hay publicaciones aún. ¡Comparte tu primera experiencia! 💌
          </div>
        ) : (
          <ForoList posts={posts} />
        )}
      </div>

      {/* 🤖 Bot despertar */}
      <div className="fixed bottom-6 right-6 z-20">
        <WakeBotButton />
      </div>
    </section>
  );
}

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { ForoForm, ForoList } from "../components/Foro";
import WakeBotButton from "../components/Bot/WakeBotButton";

import {
  ChatBubbleOvalLeftEllipsisIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";

const FRASES_BOT = [
  "💫 Respira profundo, este momento también pasará 🌤️",
  "🌿 Descansar no es rendirse, es sanar con amor propio 💖",
  "✨ Un paso a la vez también es avanzar 🌱",
  "💜 Cada emoción merece ser escuchada 🌸",
  "🌈 Tu proceso es único, y eso te hace especial ☁️",
];

function crearMensajeDiario() {
  const frase =
    FRASES_BOT[Math.floor(Math.random() * FRASES_BOT.length)];

  return {
    id: "bot-" + Date.now(),
    autor: "Emonical Bot 🤍",
    titulo: "Mensaje del día",
    texto: frase,
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
        const querySnapshot = await getDocs(collection(db, "posts"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        let merged = [...data];

        // Mensaje diario del bot (solo en cliente)
        if (typeof window !== "undefined") {
          const hoy = new Date().toDateString();
          const ultimaFrase = localStorage.getItem("ultimaFrase");

          if (ultimaFrase !== hoy) {
            merged.unshift(crearMensajeDiario());
            localStorage.setItem("ultimaFrase", hoy);
          }
        }

        if (isMounted) {
          setPosts(merged);
          setErrorMsg("");
        }
      } catch (error) {
        console.error("Error al cargar publicaciones:", error);
        if (isMounted) {
          setErrorMsg(
            "No pudimos cargar las publicaciones en este momento. Intenta de nuevo más tarde 💜"
          );
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    cargarPosts();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="relative max-w-6xl mx-auto px-5 sm:px-8 py-16 overflow-hidden">
      {/* Fondo visual suave */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#C5D4F5]/40 via-[#B4C5F7]/30 to-[#CEEBF8]/40 blur-3xl opacity-70"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Encabezado */}
      <header className="relative z-10 text-center mb-14">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-[#2D2D2D] mb-4 flex justify-center items-center gap-3"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <ChatBubbleOvalLeftEllipsisIcon className="h-9 w-9 text-[#B29DD9]" />
          Foro de experiencias
        </motion.h2>
        <p className="text-gray-700 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
          Comparte tus emociones, vivencias y consejos con la comunidad{" "}
          <span className="text-[#B29DD9] font-semibold">Emonical</span> 🌸
        </p>
      </header>

      {/* Contenido principal */}
      <div className="relative z-10 space-y-10">
        <ForoForm setPosts={setPosts} />

        {loading ? (
          <motion.div
            className="flex justify-center py-12 text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <SparklesIcon className="h-6 w-6 animate-spin text-[#B29DD9] mr-2" />
            Cargando publicaciones...
          </motion.div>
        ) : errorMsg ? (
          <div className="text-center text-sm text-red-500 bg-white/70 rounded-2xl px-4 py-3 max-w-md mx-auto shadow">
            {errorMsg}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center text-sm text-gray-500 bg-white/70 rounded-2xl px-4 py-6 max-w-md mx-auto shadow">
            Aún no hay publicaciones. Sé la primera persona en compartir algo 💌
          </div>
        ) : (
          <ForoList posts={posts} />
        )}
      </div>

      {/* Botón para “despertar” el bot / backend si lo necesitas */}
      <div className="fixed bottom-6 right-6 z-20">
        <WakeBotButton />
      </div>
    </section>
  );
}

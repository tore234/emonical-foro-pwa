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

// 🌌 Estrellas de fondo (↑ aumenté la cantidad)
const STARS = Array.from({ length: 70 }, () => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 1,
  delay: Math.random() * 6,
}));

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
        let q;

        try {
          q = query(collection(db, "comentarios"), orderBy("timestamp", "desc"));
        } catch {
          q = query(collection(db, "comentarios"));
        }

        const querySnapshot = await getDocs(q);

        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        let merged = [...data];

        const hoy = new Date().toDateString();
        const ultimaFrase = localStorage.getItem("ultimaFrase");

        if (ultimaFrase !== hoy) {
          merged.unshift(crearMensajeDiario());
          localStorage.setItem("ultimaFrase", hoy);
        }

        if (isMounted) setPosts(merged);
      } catch (error) {
        setErrorMsg("No pudimos cargar las publicaciones 💜");
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
    <section
      className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 overflow-hidden"
      style={{ color: "var(--text-main)" }}
    >
      {/* ================== FONDO GALÁCTICO (usa variables de tema) ================== */}
      {/* Capa base */}
      <motion.div
        className="absolute inset-0 -z-30 transition-all"
        style={{
          background:
            "linear-gradient(135deg, var(--bg-main), var(--bg-deep))",
        }}
        animate={{ opacity: [0.9, 1, 0.9] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Auroras / glows RGB */}
      <motion.div
        className="absolute -top-32 -left-16 w-[260px] h-[260px] sm:w-[360px] sm:h-[360px] rounded-full blur-[120px] -z-20"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, var(--glow-purple), transparent 60%)",
        }}
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-[-4rem] right-[-2rem] w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] rounded-full blur-[130px] -z-20"
        style={{
          background:
            "radial-gradient(circle at 70% 80%, var(--glow-blue), transparent 60%)",
        }}
        animate={{ x: [0, 14, 0], y: [0, -18, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Estrellas flotando */}
      {STARS.map((star, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute rounded-full bg-white/95"
          style={{
            width: star.size,
            height: star.size,
            left: `${star.x}%`,
            top: `${star.y}%`,
            filter: "drop-shadow(0 0 8px var(--glow-purple))",
          }}
          animate={{ opacity: [0, 1, 0.3, 1] }}
          transition={{
            duration: 6 + star.size,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* ================== HEADER ================== */}
      <header className="relative z-10 text-center mb-12 sm:mb-16 space-y-4">
        {/* Chip superior */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] sm:text-xs font-semibold border backdrop-blur-xl"
          style={{
            background: "var(--card-bg)",
            borderColor: "var(--card-border)",
            boxShadow: "0 0 18px var(--shadow-soft)",
            color: "var(--text-soft)",
          }}
        >
          <SparklesIcon className="h-4 w-4" style={{ color: "var(--glow-purple)" }} />
          Espacio seguro para compartir y escuchar 💫
        </motion.div>

        {/* Título principal */}
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold flex justify-center items-center gap-3"
          style={{
            color: "var(--text-main)",
            textShadow: "0 0 18px var(--glow-purple)",
          }}
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <ChatBubbleOvalLeftEllipsisIcon
            className="h-9 w-9 sm:h-11 sm:w-11"
            style={{
              color: "var(--glow-purple)",
              filter: "drop-shadow(0 0 6px var(--glow-purple))",
            }}
          />
          Foro Emonical
        </motion.h2>

        {/* Descripción */}
        <motion.p
          className="mt-3 max-w-xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed px-2"
          style={{ color: "var(--text-soft)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Comparte tus emociones, reflexiones y encuentra apoyo emocional
          dentro de una comunidad segura, empática y luminosa 💜
        </motion.p>
      </header>

      {/* ================== CONTENIDO PRINCIPAL ================== */}
      <div className="relative z-10 space-y-12 sm:space-y-14">
        {/* (Quité el marco RGB giratorio detrás del formulario) */}

        {/* Formulario */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl p-5 sm:p-7 backdrop-blur-3xl border"
          style={{
            background: "var(--card-bg)",
            borderColor: "var(--card-border)",
            boxShadow: "0 0 26px var(--shadow-soft)",
          }}
        >
          <ForoForm setPosts={setPosts} />
        </motion.div>

        {/* Estado carga / error / lista */}
        {loading ? (
          <motion.div
            className="flex justify-center items-center py-14 sm:py-16 font-semibold text-sm sm:text-lg gap-2"
            style={{ color: "var(--glow-purple)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <SparklesIcon className="h-6 w-6 sm:h-7 sm:w-7 animate-spin" />
            <span>Cargando publicaciones...</span>
          </motion.div>
        ) : errorMsg ? (
          <div
            className="text-center text-xs sm:text-sm rounded-2xl px-4 py-4 max-w-md mx-auto backdrop-blur-xl shadow border"
            style={{
              background: "var(--card-bg)",
              borderColor: "var(--card-border)",
              color: "var(--text-main)",
            }}
          >
            {errorMsg}
          </div>
        ) : posts.length === 0 ? (
          <div
            className="text-center text-xs sm:text-sm rounded-2xl px-4 py-6 max-w-md mx-auto backdrop-blur-xl shadow border"
            style={{
              background: "var(--card-bg)",
              color: "var(--text-soft)",
              borderColor: "var(--card-border)",
            }}
          >
            No hay publicaciones todavía.
            <span
              className="block mt-2 font-semibold"
              style={{ color: "var(--glow-purple)" }}
            >
              💜 ¡Sé la primera persona en compartir algo!
            </span>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ForoList posts={posts} />
          </motion.div>
        )}
      </div>
    </section>
  );
}

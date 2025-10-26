import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  SparklesIcon,
  UserCircleIcon,
  HeartIcon,
  CubeTransparentIcon,
  DevicePhoneMobileIcon,
  ArrowRightCircleIcon,
  PaperAirplaneIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid";

// 🌿 Frases automáticas del bot emocional
const frasesBot = [
  "💫 Respira profundo, este momento también pasará 🌤️",
  "🌿 Descansar no es rendirse, es sanar con amor propio 💖",
  "✨ Un paso a la vez también es avanzar 🌱",
  "💜 Cada emoción merece ser escuchada, no escondida 🌸",
  "🌈 Tu proceso es único, y eso es lo que te hace especial ☁️",
  "🫶 Hoy también cuenta, incluso si solo respiras y existes 💫",
];

// 🪷 Publicaciones precargadas
const publicacionesIniciales = [
  {
    id: "pregunta-1",
    titulo: "¿Cómo mantienen la calma antes de dormir?",
    texto: "Últimamente me cuesta conciliar el sueño por el estrés. ¿Alguien tiene rutinas o técnicas que ayuden a relajar la mente antes de dormir?",
    autor: "Sofía M.",
    fecha: "12 Oct 2025",
  },
  {
    id: "pregunta-2",
    titulo: "Consejos para sobrellevar días tristes 💭",
    texto: "Hay días donde me cuesta levantar el ánimo. ¿Qué hacen ustedes cuando se sienten desmotivados o tristes? Me gustaría leer sus experiencias o tips.",
    autor: "Diego A.",
    fecha: "10 Oct 2025",
  },
];

export default function Foro() {
  const [posts, setPosts] = useState(publicacionesIniciales);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // 🌸 Mensaje automático diario del bot emocional
        const ultimaFrase = localStorage.getItem("ultimaFrase");
        const hoy = new Date().toDateString();

        if (ultimaFrase !== hoy) {
          const fraseAleatoria =
            frasesBot[Math.floor(Math.random() * frasesBot.length)];
          data.unshift({
            id: "bot-" + Date.now(),
            autor: "Emonical Bot 🤍",
            texto: fraseAleatoria,
            fecha: new Date().toLocaleDateString("es-MX", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }),
          });
          localStorage.setItem("ultimaFrase", hoy);
        }

        setPosts([...data, ...publicacionesIniciales]);
      } catch (error) {
        console.error("Error al cargar publicaciones:", error);
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, []);

  return (
    <div className="relative max-w-6xl mx-auto px-5 sm:px-8 py-16 overflow-hidden">

      {/* 🎨 Fondo “aurora” respirante */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#B4C5F7]/40 via-[#B29DD9]/30 to-[#CEEBF8]/40 blur-3xl opacity-70"
        animate={{ opacity: [0.4, 0.75, 0.4] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 🌿 Encabezado */}
      <div className="relative z-10 text-center mb-14">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-[#2D2D2D] mb-4 flex justify-center items-center gap-3"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <ChatBubbleOvalLeftEllipsisIcon className="h-9 w-9 text-[#B29DD9] animate-bounce" />
          Foro de experiencias
        </motion.h2>

        <motion.p
          className="text-gray-700 max-w-2xl mx-auto text-base md:text-lg leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Comparte tus pensamientos, vivencias y consejos con la comunidad{" "}
          <span className="text-[#B29DD9] font-semibold">Emonical</span> 🌸
        </motion.p>
      </div>

      {/* 🪷 Formulario de publicación */}
      <motion.div
        className="relative z-10 bg-white/80 backdrop-blur-lg border border-white/50 p-6 rounded-3xl shadow-lg shadow-[#B29DD9]/10 mb-14"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-xl font-bold text-[#2D2D2D] mb-4 flex items-center gap-2">
          <PencilSquareIcon className="h-6 w-6 text-[#B29DD9]" />
          Escribe tu experiencia o pregunta 💬
        </h3>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target;
            const nuevoPost = {
              autor: form.autor.value || "Anónimo",
              titulo: form.titulo.value || "Pensamiento compartido",
              texto: form.texto.trim(),
              fecha: new Date().toLocaleDateString("es-MX", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }),
            };

            if (!nuevoPost.texto) return;
            setPosts((prev) => [nuevoPost, ...prev]);
            form.reset();
          }}
          className="grid gap-4"
        >
          <input
            type="text"
            name="autor"
            placeholder="Tu nombre (opcional)"
            className="rounded-2xl border border-white/50 bg-white/70 p-3 text-sm focus:ring-2 focus:ring-[#B29DD9]/50 outline-none transition-all"
          />
          <input
            type="text"
            name="titulo"
            placeholder="Título o tema"
            className="rounded-2xl border border-white/50 bg-white/70 p-3 text-sm focus:ring-2 focus:ring-[#B29DD9]/50 outline-none transition-all"
          />
          <textarea
            name="texto"
            placeholder="Escribe tu mensaje o pregunta..."
            className="rounded-2xl border border-white/50 bg-white/70 p-3 text-sm h-32 resize-none focus:ring-2 focus:ring-[#B29DD9]/50 outline-none transition-all"
            required
          />
          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#B29DD9] to-[#B4C5F7] text-white font-semibold py-2.5 rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all"
          >
            <PaperAirplaneIcon className="h-5 w-5 rotate-45" />
            Publicar
          </button>
        </form>
      </motion.div>

      {/* 💬 Publicaciones */}
      <div className="relative z-10 space-y-6">
        {loading ? (
          <motion.div
            className="flex justify-center py-10 text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <SparklesIcon className="h-6 w-6 animate-spin text-[#B29DD9] mr-2" />
            Cargando publicaciones...
          </motion.div>
        ) : (
          posts.map((p, i) => (
            <motion.div
              key={p.id || i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              viewport={{ once: true }}
              className={`relative rounded-3xl border border-white/40 p-6 shadow-[0_4px_20px_rgba(178,157,217,0.15)] backdrop-blur-lg ${
                p.autor?.includes("Bot")
                  ? "bg-gradient-to-br from-[#C5D4F5]/50 via-[#B4C5F7]/40 to-[#CEEBF8]/50"
                  : "bg-white/80"
              } hover:shadow-[0_6px_25px_rgba(178,157,217,0.3)] transition-all`}
            >
              <h3 className="text-lg font-semibold text-[#2D2D2D] mb-2">
                {p.titulo ||
                  (p.autor?.includes("Bot")
                    ? "🌞 Mensaje del día"
                    : "Publicación")}
              </h3>
              <p className="text-gray-700 italic leading-relaxed mb-3">
                {p.texto}
              </p>
              <div className="text-xs text-gray-500 flex justify-between items-center">
                <span className="flex items-center gap-1">
                  <UserCircleIcon className="h-4 w-4 text-[#B29DD9]" />
                  {p.autor || "Anónimo"}
                </span>
                <span>📅 {p.fecha || "Sin fecha"}</span>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* 🌈 Bloque Promocional */}
      <div className="relative z-20 mt-24 text-center">
        <motion.h3
          className="text-4xl font-bold text-[#2D2D2D] mb-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          🌈 Descubre{" "}
          <span className="text-[#B29DD9]">Emonical Móvil</span>
        </motion.h3>
        <p className="text-gray-700 max-w-2xl mx-auto mb-10 leading-relaxed">
          La app que transforma tu bienestar emocional en una experiencia
          interactiva. Vive la calma, la conexión y el autodescubrimiento 🌿
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-14">
          {[
            {
              icon: <HeartIcon className="h-8 w-8 text-[#B29DD9]" />,
              titulo: "Crecimiento emocional",
              texto:
                "Ejercicios guiados y prácticas para elevar tu bienestar.",
            },
            {
              icon: <CubeTransparentIcon className="h-8 w-8 text-[#B29DD9]" />,
              titulo: "Realidad aumentada AR",
              texto:
                "Escenarios inmersivos donde tus emociones cobran vida.",
            },
            {
              icon: <DevicePhoneMobileIcon className="h-8 w-8 text-[#B29DD9]" />,
              titulo: "Diseño progresivo PWA",
              texto:
                "Descárgala o úsala en línea. Siempre contigo, en cualquier dispositivo.",
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="bg-white/80 backdrop-blur-lg border border-white/50 rounded-3xl p-6 shadow-md hover:shadow-xl transition-all hover:border-[#B29DD9]/40"
            >
              <div className="flex justify-center mb-3">{card.icon}</div>
              <h4 className="text-lg font-semibold text-[#2D2D2D] mb-2">
                {card.titulo}
              </h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                {card.texto}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.a
          href="#"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#B29DD9] to-[#B4C5F7] text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
        >
          <ArrowRightCircleIcon className="h-6 w-6" />
          Explorar versión móvil
        </motion.a>
      </div>
    </div>
  );
}

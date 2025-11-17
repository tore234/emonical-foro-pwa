import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  NewspaperIcon,
  SparklesIcon,
  PlayCircleIcon,
} from "@heroicons/react/24/outline";
import PsicologoCard from "../components/Noticias/PsicologoCard";

// Tips base
const tipsBase = [
  {
    id: 1,
    frase:
      "“Cuando sientas ansiedad, respira profundo y enfoca tu atención en el presente. La respiración es un ancla emocional.”",
    autor: "Psic. Christian Daniel García",
  },
  {
    id: 2,
    frase:
      "“Permítete sentir sin juzgarte. Las emociones no se controlan, se comprenden.”",
    autor: "Psic. Christian Daniel García",
  },
  {
    id: 3,
    frase:
      "“Dormir bien es cuidar tu mente. No subestimes el poder del descanso emocional.”",
    autor: "Psic. Christian Daniel García",
  },
  {
    id: 4,
    frase:
      "“Escribir tus pensamientos ayuda a liberar tensión mental. Hazlo aunque no tenga sentido.”",
    autor: "Psic. Christian Daniel García",
  },
  {
    id: 5,
    frase:
      "“No compares tu proceso. Cada persona florece en su propio tiempo.”",
    autor: "Emonical Bot 💫",
  },
];

// Noticias locales
const noticiasLocales = [
  {
    id: 1,
    titulo: "Respira mejor en 2 minutos",
    texto:
      "Aprende una técnica rápida para calmar la ansiedad y reconectar con tu cuerpo en momentos de estrés.",
    autor: "Equipo Emonical",
    fecha: "13 Oct 2025",
    color: "from-[#B4C5F7]/60 via-[#C5D4F5]/50 to-[#B29DD9]/60",
  },
  {
    id: 2,
    titulo: "Micro pausas emocionales",
    texto:
      "Tomar pequeños descansos conscientes mejora la concentración y reduce la fatiga mental.",
    autor: "Psic. Ana Torres",
    fecha: "10 Oct 2025",
    color: "from-[#CEEBF8]/60 via-[#B4C5F7]/50 to-[#C5D4F5]/60",
  },
  {
    id: 3,
    titulo: "Dormir bien = pensar mejor",
    texto:
      "El descanso emocional es tan importante como el físico. Descubre cómo crear una rutina nocturna saludable.",
    autor: "Revista MindfulMx",
    fecha: "5 Oct 2025",
    color: "from-[#B29DD9]/60 via-[#B4C5F7]/50 to-[#C5D4F5]/60",
  },
];

// Videos
const videosSaludMental = [
  {
    id: "v1",
    titulo: "Meditación guiada para ansiedad 🌿",
    url: "https://www.youtube.com/embed/_6Xp03Lwm6A?si=lQqkYSeNnZo5FVRr",
  },
  {
    id: "v2",
    titulo: "Cómo calmar la mente en 5 minutos 🧘",
    url: "https://www.youtube.com/embed/KGBa47k4ag0?si=n-PUoof5JSIvrxIv",
  },
  {
    id: "v3",
    titulo: "Aprende a soltar pensamientos negativos ☁️",
    url: "https://www.youtube.com/embed/Ff333V7Gk7c?si=HciSG8Tv4xaTcNIu",
  },
];

export default function Noticias() {
  const [noticias, setNoticias] = useState(noticiasLocales);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerNoticias = async () => {
      try {
        const res = await fetch(
          "https://newsdata.io/api/1/news?apikey=pub_34593a52753cb25691e1e2092ea7b3b7b49b5&q=salud+mental&language=es"
        );
        const data = await res.json();

        if (data && data.results) {
          const noticiasAPI = data.results.slice(0, 6).map((n, index) => ({
            id: n.article_id || index,
            titulo: n.title || "Artículo sin título",
            texto: n.description || "Sin descripción disponible.",
            autor: n.source_id || "Fuente externa",
            fecha: new Date(n.pubDate).toLocaleDateString("es-MX", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }),
            color:
              index % 2 === 0
                ? "from-[#B4C5F7]/60 via-[#C5D4F5]/50 to-[#B29DD9]/60"
                : "from-[#CEEBF8]/60 via-[#B4C5F7]/50 to-[#C5D4F5]/60",
          }));
          setNoticias([...noticiasAPI, ...noticiasLocales]);
        }
      } catch (error) {
        console.error("Error al obtener noticias:", error);
      } finally {
        setLoading(false);
      }
    };
    obtenerNoticias();
  }, []);

  return (
    <main className="relative max-w-7xl mx-auto px-5 sm:px-8 py-16 overflow-hidden">
      {/* Fondo aurora */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#B4C5F7]/30 via-[#B29DD9]/20 to-[#CEEBF8]/30 blur-3xl opacity-70"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Encabezado principal */}
      <header className="relative z-10 text-center mb-16 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1 text-xs font-semibold text-[#7356B8] shadow-sm border border-white/60"
        >
          <NewspaperIcon className="h-4 w-4" />
          Contenido curado para tu bienestar
        </motion.div>

        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#2D2D2D] flex justify-center items-center gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Noticias & Tips{" "}
          <span className="relative inline-block">
            <span className="absolute inset-0 bg-gradient-to-r from-[#B29DD9] to-[#C5D4F5] opacity-50 blur-sm rounded-full" />
            <span className="relative px-1 text-[#4A36A8]">
              emocionales
            </span>
          </span>
        </motion.h2>

        <p className="text-gray-700 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
          Explora contenido reciente sobre salud mental, bienestar y equilibrio
          emocional 🌿
        </p>
      </header>

      {/* Tips del día */}
      <section className="relative z-10 mb-20">
        <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
          <h3 className="text-2xl font-bold text-[#B29DD9] flex items-center gap-2">
            <SparklesIcon className="h-6 w-6 text-[#B29DD9]" />
            Tips del día
          </h3>
          <p className="text-xs text-gray-500">
            Consejos breves para acompañarte en cualquier momento ✨
          </p>
        </div>

        <motion.div
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 px-1 sm:px-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {tipsBase.map((tip) => (
            <motion.article
              key={tip.id}
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ type: "spring", stiffness: 150 }}
              className="min-w-[280px] sm:min-w-[320px] bg-white/85 border border-white/50 shadow-md rounded-2xl p-5 backdrop-blur-lg flex flex-col justify-between relative overflow-hidden"
            >
              <span className="absolute -left-6 -top-10 text-[120px] text-[#E7DFFD] pointer-events-none select-none leading-none">
                “
              </span>
              <p className="text-gray-800 italic mb-4 leading-relaxed relative z-10">
                {tip.frase}
              </p>
              <span className="text-right text-sm text-[#2D2D2D] font-semibold relative z-10">
                — {tip.autor}
              </span>
            </motion.article>
          ))}
        </motion.div>
      </section>

      {/* Noticias recientes */}
      <section className="relative z-10 mb-20">
        <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
          <h3 className="text-2xl font-bold text-[#B29DD9]">
            Últimas noticias sobre bienestar
          </h3>
          <span className="text-xs text-gray-500">
            Fuentes seleccionadas automáticamente según el tema 💬
          </span>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-10 text-gray-500">
            <SparklesIcon className="h-6 w-6 animate-spin text-[#B29DD9] mb-2" />
            Cargando noticias...
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {noticias.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.04 }}
                viewport={{ once: true }}
                className={`relative bg-gradient-to-br ${item.color} rounded-3xl shadow-[0_4px_20px_rgba(178,157,217,0.15)] 
                  backdrop-blur-xl p-6 border border-white/40 group hover:shadow-[0_6px_25px_rgba(178,157,217,0.25)] hover:-translate-y-1 transition-all`}
              >
                <div className="mb-3 flex items-start justify-between gap-2">
                  <h4 className="text-lg font-semibold text-[#2D2D2D] leading-snug line-clamp-2">
                    {item.titulo}
                  </h4>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-4">
                  {item.texto}
                </p>
                <div className="text-[11px] text-gray-700 flex justify-between items-center border-t border-white/40 pt-2">
                  <span className="font-medium truncate max-w-[60%]">
                    {item.autor}
                  </span>
                  <span>{item.fecha}</span>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>

      {/* Videos inspiracionales */}
      <section className="relative z-10 mb-20">
        <div className="text-center mb-5">
          <h3 className="text-2xl font-bold text-[#B29DD9] flex justify-center items-center gap-2 mb-2">
            <PlayCircleIcon className="h-7 w-7 text-[#B29DD9]" />
            Videos que inspiran bienestar 🌸
          </h3>
          <p className="text-gray-700 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Disfruta de contenido audiovisual diseñado para relajarte, reflexionar
            y fortalecer tu bienestar emocional 💫
          </p>
        </div>

        <div className="flex gap-6 overflow-x-auto scrollbar-hide px-1 sm:px-3 pb-8">
          {videosSaludMental.map((video) => (
            <motion.article
              key={video.id}
              whileHover={{ scale: 1.04, y: -2 }}
              transition={{ duration: 0.3 }}
              className="min-w-[300px] sm:min-w-[360px] bg-white/90 border border-white/40 rounded-2xl shadow-md hover:shadow-xl overflow-hidden backdrop-blur-md flex flex-col"
            >
              <div className="w-full h-52 sm:h-56 bg-black/5">
                <iframe
                  width="100%"
                  height="100%"
                  src={video.url}
                  title={video.titulo}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-4 text-center">
                <h4 className="text-[#2D2D2D] font-semibold text-sm sm:text-base leading-snug">
                  {video.titulo}
                </h4>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* 🌿 Sección del Psicólogo */}
      <section className="relative z-10">
        <PsicologoCard />
      </section>
    </main>
  );
}

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  NewspaperIcon,
  SparklesIcon,
  PlayCircleIcon,
} from "@heroicons/react/24/outline";
import PsicologoCard from "../components/Noticias/PsicologoCard";

// ==================================================
//        DATA LOCAL
// ==================================================
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
      "“Permítete sentir sin juzgarte. Las emociones no se controlan… se comprenden.”",
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

const noticiasLocales = [
  {
    id: 1,
    titulo: "Respira mejor en 2 minutos",
    texto:
      "Aprende una técnica rápida para calmar la ansiedad y reconectar con tu cuerpo.",
    autor: "Equipo Emonical",
    fecha: "13 Oct 2025",
  },
  {
    id: 2,
    titulo: "Micro pausas emocionales",
    texto:
      "Tomar descansos conscientes mejora la concentración y reduce la fatiga mental.",
    autor: "Psic. Ana Torres",
    fecha: "10 Oct 2025",
  },
  {
    id: 3,
    titulo: "Dormir bien = pensar mejor",
    texto:
      "El descanso emocional es tan importante como el físico. Conoce cómo crear una rutina nocturna saludable.",
    autor: "Revista MindfulMx",
    fecha: "5 Oct 2025",
  },
];

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

// ==================================================
//                 COMPONENTE
// ==================================================
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

        if (data?.results) {
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

      {/* ==================================================
          AURORA / GLASS BACKGROUND
      ================================================== */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#B4C5F7]/40 via-[#CEEBF8]/40 to-[#9B6BFF]/40 blur-3xl opacity-70"
        animate={{ opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ==================================================
          ENCABEZADO
      ================================================== */}
      <header className="relative z-10 text-center mb-16 space-y-4">
        
        {/* Chip superior */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full 
                     bg-white/70 backdrop-blur-md px-4 py-1 
                     text-xs font-semibold text-[#6B4FD8] 
                     border border-white/60 shadow-sm"
        >
          <NewspaperIcon className="h-4 w-4" />
          Contenido curado para tu bienestar
        </motion.div>

        {/* Título principal */}
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-[#2A2055]"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Noticias & Tips
        </motion.h2>

        {/* Descripción */}
        <p className="text-[#4B4B4B] max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
          Explora contenido reciente sobre salud mental, bienestar y equilibrio emocional 🌿
        </p>
      </header>

      {/* ==================================================
          TIPS DEL DÍA
      ================================================== */}
      <section className="relative z-10 mb-20">
        <div className="flex items-center justify-between mb-4 flex-wrap">
          <h3 className="text-2xl font-bold text-[#8A4FF2] flex items-center gap-2">
            <SparklesIcon className="h-6 w-6 text-[#9B6BFF]" />
            Tips del día
          </h3>
          <p className="text-xs text-gray-500">Consejos breves que acompañan 💫</p>
        </div>

        {/* Lista horizontal */}
        <motion.div
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {tipsBase.map((tip) => (
            <motion.article
              key={tip.id}
              whileHover={{ scale: 1.05, y: -3 }}
              className="min-w-[280px] sm:min-w-[320px] 
                         bg-white/60 backdrop-blur-xl 
                         border border-[#E5D9FF] 
                         shadow-xl rounded-2xl p-6 
                         relative overflow-hidden"
            >
              <span className="absolute -left-4 -top-6 text-[100px] text-[#F0E8FF] select-none">
                “
              </span>

              <p className="text-[#2A2055] italic mb-4 leading-relaxed relative z-10">
                {tip.frase}
              </p>

              <span className="text-right block text-sm font-semibold text-[#8A4FF2]">
                — {tip.autor}
              </span>
            </motion.article>
          ))}
        </motion.div>
      </section>

      {/* ==================================================
          NOTICIAS
      ================================================== */}
      <section className="relative z-10 mb-20">
        <h3 className="text-2xl font-bold text-[#8A4FF2] mb-6">
          Últimas noticias sobre bienestar
        </h3>

        {loading ? (
          <div className="flex flex-col items-center py-10 text-gray-500">
            <SparklesIcon className="h-6 w-6 animate-spin text-[#9B6BFF]" />
            Cargando noticias...
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

            {noticias.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                viewport={{ once: true }}
                className="bg-white/70 backdrop-blur-xl 
                           border border-[#E5D9FF] p-6 rounded-3xl 
                           shadow-lg hover:shadow-2xl 
                           hover:-translate-y-1 transition-all"
              >
                <h4 className="text-lg font-semibold text-[#2A2055] mb-2">
                  {item.titulo}
                </h4>

                <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-4">
                  {item.texto}
                </p>

                <div className="text-[11px] text-gray-600 flex justify-between border-t pt-2">
                  <span className="font-medium">{item.autor}</span>
                  <span>{item.fecha}</span>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>

      {/* ==================================================
          VIDEOS
      ================================================== */}
      <section className="relative z-10 mb-20">

        <div className="text-center mb-5">
          <h3 className="text-2xl font-bold text-[#8A4FF2] flex justify-center gap-2 mb-2">
            <PlayCircleIcon className="h-7 w-7 text-[#9B6BFF]" />
            Videos que inspiran bienestar 🌸
          </h3>
          <p className="text-gray-700 max-w-xl mx-auto leading-relaxed">
            Contenido audiovisual para relajarte, reflexionar y reconectar 💫
          </p>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide">
          {videosSaludMental.map((video) => (
            <motion.article
              key={video.id}
              whileHover={{ scale: 1.04, y: -2 }}
              transition={{ duration: 0.3 }}
              className="min-w-[300px] sm:min-w-[360px] 
                         bg-white/70 backdrop-blur-xl 
                         border border-[#E5D9FF] shadow-lg 
                         rounded-2xl overflow-hidden"
            >
              <iframe
                src={video.url}
                title={video.titulo}
                className="w-full h-56"
                allowFullScreen
              ></iframe>

              <div className="p-4 text-center">
                <h4 className="text-[#2A2055] font-semibold text-sm leading-snug">
                  {video.titulo}
                </h4>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ==================================================
          PSICÓLOGO
      ================================================== */}
      <section className="relative z-10">
        <PsicologoCard />
      </section>
    </main>
  );
}

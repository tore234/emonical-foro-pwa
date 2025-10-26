import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  NewspaperIcon,
  SparklesIcon,
  PlayCircleIcon,
} from "@heroicons/react/24/outline";

// 🧘 Tips base estilo “expertos”
const tipsBase = [
  {
    id: 1,
    frase:
      "“Cuando sientas ansiedad, respira profundo y enfoca tu atención en el presente. La respiración es un ancla emocional.”",
    autor: "Psic. Christian Daniel García",
  },
  {
    id: 2,
    frase: "“Permítete sentir sin juzgarte. Las emociones no se controlan, se comprenden.”",
    autor: "Psic. Christian Daniel García",
  },
  {
    id: 3,
    frase: "“Dormir bien es cuidar tu mente. No subestimes el poder del descanso emocional.”",
    autor: "Psic. Christian Daniel García",
  },
  {
    id: 4,
    frase: "“Escribir tus pensamientos ayuda a liberar tensión mental. Hazlo aunque no tenga sentido.”",
    autor: "Psic. Christian Daniel García",
  },
  {
    id: 5,
    frase: "“No compares tu proceso. Cada persona florece en su propio tiempo.”",
    autor: "Emonical Bot 💫",
  },
];

// Noticias base (fallback)
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

// 🎥 Videos de salud mental
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
    <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-16 overflow-hidden">

      {/* 💫 Fondo aurora */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#B4C5F7]/30 via-[#B29DD9]/20 to-[#CEEBF8]/30 blur-3xl opacity-70"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 📰 Encabezado principal */}
      <div className="relative z-10 text-center mb-14">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-[#2D2D2D] mb-4 flex justify-center items-center gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <NewspaperIcon className="h-9 w-9 text-[#B29DD9]" />
          Noticias & Tips Emocionales
        </motion.h2>
        <p className="text-gray-700 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
          Explora contenido reciente sobre salud mental, bienestar y equilibrio emocional 🌿
        </p>
      </div>

      {/* 💡 Tips del día */}
      <section className="relative z-10 mb-20">
        <h3 className="text-2xl font-bold text-[#B29DD9] text-center mb-6 flex justify-center items-center gap-2">
          <SparklesIcon className="h-6 w-6 text-[#B29DD9]" /> Tips del Día
        </h3>

        <motion.div
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 px-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {tipsBase.map((tip) => (
            <motion.div
              key={tip.id}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 150 }}
              className="min-w-[280px] sm:min-w-[320px] bg-white/80 border border-white/40 shadow-md rounded-2xl p-5 backdrop-blur-lg flex flex-col justify-between"
            >
              <p className="text-gray-800 italic mb-3 leading-relaxed">
                {tip.frase}
              </p>
              <span className="text-right text-sm text-[#2D2D2D] font-semibold">
                — {tip.autor}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 🧠 Noticias recientes */}
      <section className="relative z-10 mb-20">
        <h3 className="text-2xl font-bold text-[#B29DD9] text-center mb-6">
          Últimas Noticias sobre Bienestar
        </h3>

        {loading ? (
          <p className="text-center text-gray-500 py-10">
            Cargando noticias...
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {noticias.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className={`relative bg-gradient-to-br ${item.color} rounded-3xl shadow-[0_4px_20px_rgba(178,157,217,0.15)] 
                            backdrop-blur-xl p-6 border border-white/40 group hover:shadow-[0_6px_25px_rgba(178,157,217,0.25)] hover:-translate-y-1 transition-all`}
              >
                <h4 className="text-lg font-semibold text-[#2D2D2D] mb-2">
                  {item.titulo}
                </h4>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  {item.texto}
                </p>
                <div className="text-xs text-gray-600 flex justify-between items-center border-t border-white/30 pt-2">
                  <span className="font-medium">{item.autor}</span>
                  <span>{item.fecha}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* 🎥 Carrusel de videos */}
      <section className="relative z-10">
        <h3 className="text-2xl font-bold text-[#B29DD9] text-center mb-5 flex justify-center items-center gap-2">
          <PlayCircleIcon className="h-7 w-7 text-[#B29DD9]" />
          Videos que inspiran bienestar 🌸
        </h3>
        <p className="text-gray-700 text-center max-w-xl mx-auto mb-8 leading-relaxed">
          Disfruta de contenido en video que te ayudará a calmar tu mente, reconectar contigo y cuidar tu salud emocional 💫
        </p>

        <div className="flex gap-6 overflow-x-auto scrollbar-hide px-3 pb-8">
          {videosSaludMental.map((video) => (
            <motion.div
              key={video.id}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
              className="min-w-[320px] sm:min-w-[380px] bg-white/90 border border-white/40 rounded-2xl shadow-md hover:shadow-xl overflow-hidden backdrop-blur-md"
            >
              <iframe
                width="100%"
                height="210"
                src={video.url}
                title={video.titulo}
                className="rounded-t-2xl"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <div className="p-4 text-center">
                <h4 className="text-[#2D2D2D] font-semibold text-base">
                  {video.titulo}
                </h4>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      {/* 🌍 SECCIÓN DE FUENTES CONFIABLES */}
<section className="relative z-10 mt-24">
  <h3 className="text-2xl font-bold text-[#B29DD9] text-center mb-4">
    🌍 Fuentes Confiables sobre Salud Mental
  </h3>
  <p className="text-gray-700 text-center max-w-2xl mx-auto mb-10 leading-relaxed">
    Explora portales oficiales y recursos revisados por expertos para aprender más
    sobre bienestar emocional y salud mental.
  </p>

  <motion.div
    className="flex gap-6 overflow-x-auto px-4 pb-8 scrollbar-hide"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.6 }}
  >
    {[
      {
        nombre: "NIMH (EE.UU.)",
        url: "https://www.nimh.nih.gov/espanol",
        desc: "Autoridad en investigación científica sobre salud mental. Información en español y confiable.",
        color: "from-[#B4C5F7]/50 via-[#B29DD9]/50 to-[#CEEBF8]/60",
        icon: "🧠",
      },
      {
        nombre: "Mayo Clinic",
        url: "https://www.mayoclinic.org/es-es/diseases-conditions/mental-illness/symptoms-causes/syc-20374968",
        desc: "Guías médicas revisadas por expertos sobre trastornos, síntomas y tratamientos.",
        color: "from-[#CEEBF8]/60 via-[#B4C5F7]/50 to-[#B29DD9]/60",
        icon: "🏥",
      },
      {
        nombre: "OMS - Organización Mundial de la Salud",
        url: "https://www.who.int/es/news-room/fact-sheets/detail/mental-health-strengthening-our-response",
        desc: "Datos globales, políticas y directrices internacionales sobre salud mental.",
        color: "from-[#B29DD9]/60 via-[#C5D4F5]/50 to-[#B4C5F7]/60",
        icon: "🌐",
      },
      {
        nombre: "American Psychiatric Association (APA)",
        url: "https://www.psychiatry.org/patients-families",
        desc: "Recursos en inglés para pacientes y familias, centrados en la psiquiatría moderna.",
        color: "from-[#B4C5F7]/50 via-[#CEEBF8]/60 to-[#B29DD9]/60",
        icon: "📘",
      },
      {
        nombre: "Mental Health America (MHA)",
        url: "https://mhanational.org/",
        desc: "Herramientas, tests y artículos prácticos sobre bienestar mental y autocuidado.",
        color: "from-[#CEEBF8]/50 via-[#C5D4F5]/50 to-[#B29DD9]/50",
        icon: "💬",
      },
    ].map((fuente, i) => (
      <motion.a
        key={i}
        href={fuente.url}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.07, rotate: 0.5 }}
        transition={{ type: "spring", stiffness: 150 }}
        className={`min-w-[290px] sm:min-w-[340px] bg-gradient-to-br ${fuente.color} 
          p-6 rounded-3xl shadow-md hover:shadow-xl backdrop-blur-lg border border-white/40
          flex flex-col justify-between relative overflow-hidden transition-all`}
      >
        {/* Fondo con brillo animado */}
        <motion.div
          className="absolute inset-0 bg-white/20 blur-2xl opacity-0 group-hover:opacity-30 transition-all"
          animate={{ opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative z-10">
          <span className="text-4xl mb-3 block">{fuente.icon}</span>
          <h4 className="text-lg font-semibold text-[#2D2D2D] mb-2">
            {fuente.nombre}
          </h4>
          <p className="text-gray-700 text-sm mb-3 leading-relaxed">
            {fuente.desc}
          </p>
        </div>
        <motion.div
          whileHover={{ x: 4 }}
          className="text-[#B29DD9] font-medium flex items-center gap-1"
        >
          Visitar sitio →
        </motion.div>
      </motion.a>
    ))}
  </motion.div>
</section>

    </div>
  );
}

// src/components/Foro/ForoList.jsx
import { motion } from "framer-motion";
import {
  UserCircleIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from "@heroicons/react/24/solid";

// Avatares emocionales
import neutralImg from "../../assets/emociones/emonical_avatar_neutral.png";
import ansiedadImg from "../../assets/emociones/emonical_avatar_ansiedad.png";
import enojoImg from "../../assets/emociones/emonical_avatar_enojo.png";
import estresImg from "../../assets/emociones/emonical_avatar_estres.png";
import miedoImg from "../../assets/emociones/emonical_avatar_miedo.png";
import tristezaImg from "../../assets/emociones/emonical_avatar_tristeza.png";

// Mapa emocional
const EMOCIONES = {
  neutral: { label: "Tranquil@", image: neutralImg },
  ansiedad: { label: "Ansiedad", image: ansiedadImg },
  enojo: { label: "Enojo", image: enojoImg },
  estres: { label: "Estrés", image: estresImg },
  miedo: { label: "Miedo", image: miedoImg },
  tristeza: { label: "Tristeza", image: tristezaImg },
};

const isBot = (post) =>
  post?.tipo === "bot" ||
  (post?.autor || "").toLowerCase().includes("bot");

const isBotRespuesta = (post) =>
  isBot(post) &&
  (post?.titulo || "").toLowerCase().includes("respuesta");

export default function ForoList({ posts = [] }) {
  if (!Array.isArray(posts) || posts.length === 0) return null;

  // Agrupar: [usuario + bot] cuando vienen seguidos
  const items = [];
  for (let i = 0; i < posts.length; ) {
    const current = posts[i];
    const next = posts[i + 1];

    if (!isBot(current) && next && isBotRespuesta(next)) {
      items.push({
        type: "thread",
        userPost: current,
        botPost: next,
        key: current.id || `thread-${i}`,
      });
      i += 2;
    } else {
      items.push({
        type: "single",
        post: current,
        key: current.id || `single-${i}`,
      });
      i += 1;
    }
  }

  return (
    <div className="relative z-10 space-y-8 md:space-y-10">
      {items.map((item, index) =>
        item.type === "thread" ? (
          <ThreadCard
            key={item.key}
            userPost={item.userPost}
            botPost={item.botPost}
            index={index}
          />
        ) : (
          <SingleCard key={item.key} post={item.post} index={index} />
        )
      )}
    </div>
  );
}

/* ==========================
   HILO: USUARIO + BOT
   ========================== */

function ThreadCard({ userPost, botPost, index }) {
  const fecha = userPost?.fecha || botPost?.fecha || "Fecha desconocida";
  const emocion = EMOCIONES[userPost?.emocion] || EMOCIONES.neutral;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="relative rounded-[28px] border backdrop-blur-2xl p-5 sm:p-6 md:p-7"
      style={{
        background: "var(--card-bg)",
        borderColor: "var(--card-border)",
        boxShadow: "0 0 30px var(--shadow-soft)",
      }}
    >
      {/* Marco RGB suave */}
      <motion.div
        className="pointer-events-none absolute -inset-[2px] rounded-[30px] opacity-60 -z-10"
        style={{
          background:
            "conic-gradient(from_180deg,rgba(167,139,250,0.8),rgba(56,189,248,0.85),rgba(244,114,182,0.85),rgba(167,139,250,0.8))",
        }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      />

      {/* Encabezado hilo */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-5">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold">
          <ChatBubbleOvalLeftEllipsisIcon
            className="h-5 w-5"
            style={{ color: "var(--glow-purple)" }}
          />
          <span style={{ color: "var(--text-main)" }}>
            Hilo: tu mensaje + respuesta de EmonicalBot
          </span>
        </div>
        <span
          className="text-[11px] sm:text-xs"
          style={{ color: "var(--text-soft)" }}
        >
          📅 {fecha}
        </span>
      </div>

      {/* Contenido en dos columnas (responsive) */}
      <div className="grid gap-4 md:grid-cols-[minmax(0,1.2fr)_auto_minmax(0,1.2fr)] items-stretch">
        {/* Mensaje usuario */}
        <div
          className="rounded-2xl border p-4 sm:p-5 flex flex-col h-full"
          style={{
            background: "var(--input-bg)",
            borderColor: "var(--card-border)",
          }}
        >
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <img
                src={emocion.image}
                alt={emocion.label}
                className="w-9 h-9 rounded-full shadow-md"
              />
              <div className="text-xs sm:text-sm">
                <p
                  className="font-semibold"
                  style={{ color: "var(--text-main)" }}
                >
                  {userPost?.autor || "Anónimo"}
                </p>
                <p
                  className="text-[11px]"
                  style={{ color: "var(--text-soft)" }}
                >
                  Estado: {emocion.label}
                </p>
              </div>
            </div>

            <span className="text-[10px] sm:text-xs px-2 py-1 rounded-full font-semibold bg-white/10 dark:bg-slate-900/60 border border-white/30 dark:border-slate-600/70">
              🧑‍💬 Tu mensaje
            </span>
          </div>

          <h3
            className="text-sm sm:text-base font-semibold mb-2"
            style={{ color: "var(--text-main)" }}
          >
            {userPost?.titulo || "Publicación de la comunidad"}
          </h3>

          <p
            className="text-xs sm:text-sm leading-relaxed"
            style={{ color: "var(--text-soft)" }}
          >
            {userPost?.texto || "Sin contenido disponible."}
          </p>
        </div>

        {/* Conector visual: avatar neutral Emonical en el centro */}
        <div className="hidden md:flex items-center justify-center">
          <motion.div
            className="relative w-20 h-20 rounded-full flex items-center justify-center shadow-xl overflow-hidden"
            style={{
              background:
                "radial-gradient(circle at 30% 20%, var(--glow-purple), transparent 60%)",
              boxShadow: "0 0 26px var(--glow-purple)",
            }}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Glow extra detrás */}
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_bottom,var(--glow-blue),transparent_70%)] opacity-70" />
            {/* Avatar neutral */}
            <img
              src={neutralImg}
              alt="Emonical avatar"
              className="relative w-12 h-12 object-contain drop-shadow-[0_0_14px_rgba(255,255,255,0.9)]"
            />
          </motion.div>
        </div>

        {/* Respuesta bot (en móvil se va debajo, en desktop a la derecha) */}
        <div
          className="rounded-2xl border p-4 sm:p-5 flex flex-col h-full bg-gradient-to-br from-[var(--card-bg-bot)]/90 to-[var(--glow-blue)]/15"
          style={{
            borderColor: "var(--card-border)",
            boxShadow: "0 0 24px var(--glow-purple)",
          }}
        >
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-[radial-gradient(circle_at_top,var(--glow-purple),transparent_70%)] flex items-center justify-center shadow-md">
                🤍
              </div>
              <div className="text-xs sm:text-sm">
                <p
                  className="font-semibold"
                  style={{ color: "var(--text-main)" }}
                >
                  Emonical Bot
                </p>
                <p
                  className="text-[11px]"
                  style={{ color: "var(--text-soft)" }}
                >
                  Respuesta empática
                </p>
              </div>
            </div>

            <span className="text-[10px] sm:text-xs px-2 py-1 rounded-full font-semibold bg-white/20 dark:bg-slate-900/60 border border-white/50 dark:border-slate-600/70">
              🤖 Respuesta del bot
            </span>
          </div>

          <h4
            className="text-sm sm:text-base font-semibold mb-2"
            style={{ color: "var(--text-main)" }}
          >
            {botPost?.titulo || "Respuesta a tu reflexión ✨"}
          </h4>

          <p
            className="text-xs sm:text-sm leading-relaxed"
            style={{ color: "var(--text-soft)" }}
          >
            {botPost?.texto || "Hubo un problema para procesar tu reflexión 💜"}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ==========================
   TARJETA SIMPLE (solo bot o solo usuario)
   ========================== */

function SingleCard({ post, index }) {
  const bot = isBot(post);
  const emocion = EMOCIONES[post?.emocion] || EMOCIONES.neutral;

  const titulo =
    post?.titulo || (bot ? "✨ Mensaje del día" : "Publicación de la comunidad");
  const texto = post?.texto || "Sin contenido disponible.";
  const autor = post?.autor || (bot ? "Emonical Bot 🤍" : "Anónimo");
  const fecha = post?.fecha || "Fecha desconocida";

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="rounded-3xl p-5 sm:p-6 backdrop-blur-2xl border transition-all"
      style={{
        background: bot ? "var(--card-bg-bot)" : "var(--card-bg)",
        borderColor: "var(--card-border)",
        boxShadow: bot
          ? "0 0 30px var(--glow-purple)"
          : "0 0 22px var(--shadow-soft)",
        color: "var(--text-main)",
      }}
    >
      {/* HEADER */}
      <div className="flex justify-between items-center gap-3 mb-2">
        <div className="flex items-center gap-3">
          <img
            src={bot ? neutralImg : emocion.image}
            className="w-9 h-9 rounded-full shadow-md"
            alt={emocion.label}
          />
          <div>
            <h3
              className="text-sm sm:text-base font-semibold tracking-tight"
              style={{
                color: "var(--text-main)",
                textShadow: "0 0 10px var(--glow-purple)",
              }}
            >
              {titulo}
            </h3>
            <p
              className="text-[11px] sm:text-xs flex items-center gap-1"
              style={{ color: "var(--text-soft)" }}
            >
              <UserCircleIcon
                className="h-4 w-4"
                style={{ color: "var(--glow-purple)" }}
              />
              {autor}
            </p>
          </div>
        </div>

        <span
          className="text-[10px] sm:text-xs"
          style={{ color: "var(--text-soft)" }}
        >
          📅 {fecha}
        </span>
      </div>

      {/* CONTENIDO */}
      <p
        className="mt-2 text-xs sm:text-sm leading-relaxed"
        style={{ color: "var(--text-soft)" }}
      >
        {texto}
      </p>
    </motion.div>
  );
}

// src/pages/Perfil.jsx
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";
import Login from "../components/Usuario/Login";
import PerfilCard from "../components/Usuario/PerfilCard";

/* --------------------- ESTRELLAS / PARTÍCULAS GALAXIA --------------------- */

const STARS = Array.from({ length: 50 }, () => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 1,
  delay: Math.random() * 6,
}));

const ORBIT_RINGS = [
  { size: 260, border: "rgba(180,120,255,0.28)" },
  { size: 360, border: "rgba(96,165,250,0.24)" },
  { size: 460, border: "rgba(244,114,182,0.18)" },
];

export default function Perfil() {
  const { user, loadingAuth, logout } = useAuth();
  const { theme } = useTheme();

  const isLogged = Boolean(user);
  const isDark = theme === "dark";

  // ======= PALETAS SEGÚN TEMA (COLORES QUE NO SE PIERDEN) =======
  const loadingBg = isDark
    ? "radial-gradient(circle at top, rgba(30,64,175,0.65), #020617)"
    : "radial-gradient(circle at top, rgba(191,219,254,0.9), #EEF2FF)";

  const starShadow = isDark
    ? "0 0 10px rgba(191,219,254,0.9)"
    : "0 0 8px rgba(129,140,248,0.7)";

  const mainBg = isDark
    ? "radial-gradient(circle at 10% 0%, rgba(55,65,194,0.7), #020617)"
    : "radial-gradient(circle at 10% 0%, rgba(219,234,254,1), #F9FAFB)";

  const leftNebula = isDark
    ? "radial-gradient(circle, rgba(56,189,248,0.45), transparent)"
    : "radial-gradient(circle, rgba(56,189,248,0.25), transparent)";

  const rightNebula = isDark
    ? "radial-gradient(circle, rgba(248,113,113,0.4), transparent)"
    : "radial-gradient(circle, rgba(248,113,113,0.22), transparent)";

  const subtitleColor = isDark ? "rgba(226,232,240,0.9)" : "#4B5563";

  const cardBg = isDark ? "rgba(15,23,42,0.9)" : "rgba(255,255,255,0.96)";
  const cardBorder = isDark
    ? "rgba(165,180,252,0.6)"
    : "rgba(209,213,219,0.9)";
  const cardShadow = isDark
    ? "0 0 40px rgba(15,23,42,0.9)"
    : "0 18px 40px rgba(148,163,184,0.55)";

  const innerCardBg = isDark ? "rgba(15,23,42,0.9)" : "rgba(249,250,251,1)";
  const innerCardBorder = isDark
    ? "rgba(248,250,252,0.18)"
    : "rgba(209,213,219,1)";

  const loginCardBg = isDark ? "rgba(15,23,42,0.9)" : "rgba(255,255,255,1)";
  const loginCardBorder = isDark
    ? "rgba(199,210,254,0.55)"
    : "rgba(191,219,254,0.95)";

  const subtitleLoadingColor = isDark ? "#E5E7EB" : "#4B5563";

  const titleGradientClasses = isDark
    ? "from-[#E0EAFF] via-white to-[#BFDBFE]"
    : "from-[#4F46E5] via-[#6366F1] to-[#0EA5E9]";

  const titleShadow = isDark
    ? "0 0 18px rgba(129,140,248,0.9)"
    : "0 0 10px rgba(148,163,184,0.75)";

  // ======================= ESTADO DE CARGA (GALAXIA) =======================
  if (loadingAuth) {
    return (
      <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
        {/* Fondo galaxia */}
        <motion.div
          className="absolute inset-0"
          style={{ backgroundImage: loadingBg }}
          animate={{ opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Estrellas */}
        {STARS.map((star, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: star.size,
              height: star.size,
              left: `${star.x}%`,
              top: `${star.y}%`,
              boxShadow: starShadow,
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

        {/* Orbit loader */}
        <div className="relative z-10 flex flex-col items-center gap-4 px-4 text-center">
          <motion.div
            className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full border border-violet-400/60"
            animate={{ rotate: 360 }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          >
            <motion.div
              className="absolute inset-3 rounded-full border border-cyan-300/60"
              animate={{ rotate: -360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-1 rounded-full bg-gradient-to-tr from-violet-700/60 via-indigo-500/40 to-cyan-400/40 blur-sm"
              animate={{ opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>
          <p
            className="text-xs sm:text-sm md:text-base drop-shadow-[0_0_10px_rgba(167,139,250,0.7)]"
            style={{ color: subtitleLoadingColor }}
          >
            Cargando tu universo emocional...
          </p>
        </div>
      </div>
    );
  }

  // ======================== PÁGINA PERFIL GALAXIA ==========================
  return (
    <main className="relative flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-4 sm:px-6 py-10 sm:py-16 overflow-hidden">
      {/* 🌌 CAPA 1: FONDO GALAXIA PRINCIPAL */}
      <motion.div
        className="absolute inset-0"
        style={{ backgroundImage: mainBg }}
        animate={{ opacity: [0.9, 1, 0.9] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 🌈 CAPA 2: NEBULOSAS (RESPONSIVE) */}
      <motion.div
        className="absolute -bottom-40 -left-24 w-[260px] h-[260px] sm:w-[380px] sm:h-[380px] md:w-[520px] md:h-[520px] rounded-full blur-[120px] sm:blur-[150px] md:blur-[170px]"
        style={{ background: leftNebula }}
        animate={{ y: [0, -20, 0], opacity: [0.35, 0.7, 0.35] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute -top-40 right-[-4rem] w-[230px] h-[230px] sm:w-[340px] sm:h-[340px] md:w-[480px] md:h-[480px] rounded-full blur-[120px] sm:blur-[150px] md:blur-[190px]"
        style={{ background: rightNebula }}
        animate={{ y: [0, 18, 0], opacity: [0.3, 0.65, 0.3] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ✨ ESTRELLAS */}
      {STARS.map((star, i) => (
        <motion.div
          key={`star-${i}`}
          className="pointer-events-none absolute rounded-full bg-white"
          style={{
            width: star.size,
            height: star.size,
            left: `${star.x}%`,
            top: `${star.y}%`,
            boxShadow: starShadow,
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

      {/* 🪐 ORBITAS ALREDEDOR DEL CONTENIDO (SUAVES EN MOBILE) */}
      <div className="pointer-events-none absolute flex items-center justify-center inset-0">
        {ORBIT_RINGS.map((ring, index) => (
          <motion.div
            key={index}
            className="hidden sm:block rounded-full border"
            style={{
              width: ring.size,
              height: ring.size,
              borderColor: ring.border,
            }}
            animate={{ rotate: index % 2 === 0 ? 360 : -360 }}
            transition={{
              duration: 40 + index * 12,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* AVATAR GALÁCTICO */}
      <motion.img
        src="/assets/emonical-avatar.png"
        alt="Avatar emocional"
        animate={{ y: [0, -10, 0], rotate: [0, 2, -2, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="w-24 h-24 sm:w-28 sm:h-28 mb-5 sm:mb-6 relative z-10 drop-shadow-[0_0_28px_rgba(129,140,248,0.75)]"
      />

      {/* TÍTULO */}
      <motion.h2
        className={`text-center text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 relative z-10 
                    bg-gradient-to-r ${titleGradientClasses}
                    bg-clip-text text-transparent`}
        style={{ textShadow: titleShadow }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {isLogged ? (
          <>
            Hola,&nbsp;
            <span className="underline decoration-violet-400/70 decoration-wavy underline-offset-4">
              {user.email || "Invitad@"}
            </span>
          </>
        ) : (
          <>
            Tu portal en <span>Emonical NeoGlow</span>
          </>
        )}
      </motion.h2>

      {/* SUBTEXTO */}
      <p
        className="relative z-10 text-center max-w-md mb-8 sm:mb-10 leading-relaxed 
                    text-xs sm:text-sm md:text-base"
        style={{ color: subtitleColor }}
      >
        {isLogged
          ? "Explora los datos de tu cuenta y viaja por tu universo emocional dentro de Emonical 💜"
          : "Inicia sesión o crea tu cuenta para guardar tus publicaciones, comentar y conectar con otras almas estelares ✨"}
      </p>

      {/* CONTENEDOR PRINCIPAL */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="relative z-20 w-full max-w-md sm:max-w-lg"
      >
        {/* Marco RGB sutil detrás de la tarjeta */}
        <motion.div
          className="absolute -inset-[2px] rounded-[24px] sm:rounded-[28px] 
                     bg-[conic-gradient(from_180deg,rgba(167,139,250,0.9),rgba(56,189,248,0.9),rgba(244,114,182,0.9),rgba(167,139,250,0.9))] 
                     opacity-70 blur-[1px]"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        />

        {/* Tarjeta principal glass */}
        <div
          className="relative rounded-[22px] sm:rounded-[26px] backdrop-blur-2xl 
                     p-5 sm:p-6 md:p-7 border"
          style={{
            backgroundColor: cardBg,
            borderColor: cardBorder,
            boxShadow: cardShadow,
          }}
        >
          {isLogged ? (
            <div className="space-y-5 sm:space-y-6">
              {/* Tarjeta interna */}
              <div
                className="rounded-2xl sm:rounded-3xl backdrop-blur-xl border 
                           shadow-[0_0_24px_rgba(79,70,229,0.45)] p-4 sm:p-5"
                style={{
                  backgroundColor: innerCardBg,
                  borderColor: innerCardBorder,
                }}
              >
                <PerfilCard user={user} />
              </div>

              {/* BOTÓN SALIR */}
              <div className="flex justify-center pt-1 sm:pt-2">
                <button
                  onClick={logout}
                  className="px-7 sm:px-8 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold 
                             text-red-50 border border-red-400/50
                             bg-gradient-to-r from-red-600/80 to-rose-500/90
                             shadow-[0_0_18px_rgba(248,113,113,0.7)]
                             hover:shadow-[0_0_24px_rgba(248,113,113,0.9)]
                             hover:scale-[1.02]
                             active:scale-[0.97]
                             transition-all duration-200"
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
          ) : (
            // FORMULARIO LOGIN - CONTENEDOR GLOW
            <div
              className="rounded-2xl sm:rounded-3xl backdrop-blur-xl border 
                         shadow-[0_0_26px_rgba(79,70,229,0.55)] p-4 sm:p-5 md:p-6"
              style={{
                backgroundColor: loginCardBg,
                borderColor: loginCardBorder,
              }}
            >
              <Login />
            </div>
          )}
        </div>
      </motion.div>
    </main>
  );
}

// src/pages/Perfil.jsx
import { useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { motion, useReducedMotion } from "framer-motion";
import { Suspense, lazy } from "react";

// Carga diferida (reduce JS en la primera vista)
const Login = lazy(() => import("../components/Usuario/Login"));
const PerfilCard = lazy(() => import("../components/Usuario/PerfilCard"));

/* --------------------- ESTRELLAS / PARTÍCULAS --------------------- */
// Generamos estrellas una sola vez por tamaño de pantalla (móvil vs desktop)
function makeStars(count) {
  return Array.from({ length: count }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 6,
  }));
}

const ORBIT_RINGS = [
  { size: 260, border: "rgba(180,120,255,0.22)" },
  { size: 360, border: "rgba(96,165,250,0.18)" },
  { size: 460, border: "rgba(244,114,182,0.14)" },
];

export default function Perfil() {
  const { user, loadingAuth, logout } = useAuth();
  const { theme } = useTheme();
  const reduceMotion = useReducedMotion();

  const isLogged = Boolean(user);
  const isDark = theme === "dark";

  // Móvil simple: menos partículas + menos blur
  const isMobile = typeof window !== "undefined" ? window.innerWidth < 640 : true;
  const STARS = useMemo(() => makeStars(isMobile ? 18 : 40), [isMobile]);

  /* ======= Paletas & estilos memorizados (evita crear objetos cada render) ======= */
  const styles = useMemo(() => {
    const loadingBg = isDark
      ? "radial-gradient(circle at top, rgba(30,64,175,0.65), #020617)"
      : "radial-gradient(circle at top, rgba(191,219,254,0.9), #EEF2FF)";

    const starShadow = isDark
      ? "0 0 7px rgba(191,219,254,0.85)"
      : "0 0 6px rgba(129,140,248,0.65)";

    const mainBg = isDark
      ? "radial-gradient(circle at 10% 0%, rgba(55,65,194,0.6), #020617)"
      : "radial-gradient(circle at 10% 0%, rgba(219,234,254,1), #F9FAFB)";

    const leftNebula = isDark
      ? "radial-gradient(circle, rgba(56,189,248,0.35), transparent)"
      : "radial-gradient(circle, rgba(56,189,248,0.22), transparent)";

    const rightNebula = isDark
      ? "radial-gradient(circle, rgba(248,113,113,0.32), transparent)"
      : "radial-gradient(circle, rgba(248,113,113,0.18), transparent)";

    const subtitleColor = isDark ? "rgba(226,232,240,0.9)" : "#4B5563";

    const cardBg = isDark ? "rgba(15,23,42,0.88)" : "rgba(255,255,255,0.96)";
    const cardBorder = isDark ? "rgba(165,180,252,0.5)" : "rgba(209,213,219,0.85)";
    const cardShadow = isDark
      ? "0 8px 22px rgba(2,6,23,0.65)"
      : "0 12px 28px rgba(148,163,184,0.35)";

    const innerCardBg = isDark ? "rgba(15,23,42,0.9)" : "rgba(249,250,251,1)";
    const innerCardBorder = isDark ? "rgba(248,250,252,0.16)" : "rgba(209,213,219,1)";

    const loginCardBg = isDark ? "rgba(15,23,42,0.92)" : "rgba(255,255,255,1)";
    const loginCardBorder = isDark ? "rgba(199,210,254,0.5)" : "rgba(191,219,254,0.9)";

    const subtitleLoadingColor = isDark ? "#E5E7EB" : "#4B5563";

    const titleGradientClasses = isDark
      ? "from-[#E0EAFF] via-white to-[#BFDBFE]"
      : "from-[#4F46E5] via-[#6366F1] to-[#0EA5E9]";

    const titleShadow = isDark
      ? "0 0 10px rgba(129,140,248,0.6)"
      : "0 0 8px rgba(148,163,184,0.55)";

    return {
      loadingBg, starShadow, mainBg, leftNebula, rightNebula, subtitleColor,
      cardBg, cardBorder, cardShadow, innerCardBg, innerCardBorder,
      loginCardBg, loginCardBorder, subtitleLoadingColor,
      titleGradientClasses, titleShadow
    };
  }, [isDark]);

  // Si el usuario prefiere menos movimiento, apagamos animaciones complejas
  const animate = !reduceMotion;

  /* ======================= ESTADO DE CARGA ======================= */
  if (loadingAuth) {
    return (
      <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ backgroundImage: styles.loadingBg }}
        />
        {animate &&
          STARS.map((s, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white will-change-opacity"
              style={{
                width: s.size,
                height: s.size,
                left: `${s.x}%`,
                top: `${s.y}%`,
                boxShadow: styles.starShadow,
              }}
              animate={{ opacity: [0, 1, 0.35, 1] }}
              transition={{ duration: 5 + s.size, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        <div className="relative z-10 flex flex-col items-center gap-4 px-4 text-center">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-violet-400/50">
            {animate && (
              <>
                <motion.div
                  className="absolute inset-3 rounded-full border border-cyan-300/50"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-1 rounded-full bg-gradient-to-tr from-violet-700/50 via-indigo-500/30 to-cyan-400/30 blur-sm"
                  animate={{ opacity: [0.4, 0.9, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </>
            )}
          </div>
          <p className="text-xs sm:text-sm md:text-base" style={{ color: styles.subtitleLoadingColor }}>
            Cargando tu universo emocional...
          </p>
        </div>
      </div>
    );
  }

  /* ======================== PÁGINA PERFIL ========================== */
  return (
    <main className="relative flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-4 sm:px-6 py-10 sm:py-16 overflow-hidden">
      {/* Fondo */}
      <div className="absolute inset-0" style={{ backgroundImage: styles.mainBg }} />

      {/* Nebulosas (blur reducido en móvil) */}
      <div
        className="absolute -bottom-40 -left-24 w-[240px] h-[240px] sm:w-[360px] sm:h-[360px] md:w-[520px] md:h-[520px] rounded-full blur-[80px] sm:blur-[120px] md:blur-[160px]"
        style={{ background: styles.leftNebula }}
      />
      <div
        className="absolute -top-40 right-[-4rem] w-[210px] h-[210px] sm:w-[320px] sm:h-[320px] md:w-[480px] md:h-[480px] rounded-full blur-[80px] sm:blur-[120px] md:blur-[170px]"
        style={{ background: styles.rightNebula }}
      />

      {/* Estrellas (solo si animamos) */}
      {animate &&
        STARS.map((s, i) => (
          <motion.div
            key={`star-${i}`}
            className="pointer-events-none absolute rounded-full bg-white will-change-opacity"
            style={{
              width: s.size,
              height: s.size,
              left: `${s.x}%`,
              top: `${s.y}%`,
              boxShadow: styles.starShadow,
            }}
            animate={{ opacity: [0, 1, 0.35, 1] }}
            transition={{ duration: 5 + s.size, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

      {/* Órbitas (ocultas en móvil y sin animación si reduceMotion) */}
      <div className="pointer-events-none absolute flex items-center justify-center inset-0">
        {ORBIT_RINGS.map((ring, idx) =>
          animate ? (
            <motion.div
              key={idx}
              className="hidden sm:block rounded-full border"
              style={{ width: ring.size, height: ring.size, borderColor: ring.border }}
              animate={{ rotate: idx % 2 === 0 ? 360 : -360 }}
              transition={{ duration: 38 + idx * 12, repeat: Infinity, ease: "linear" }}
            />
          ) : (
            <div
              key={idx}
              className="hidden sm:block rounded-full border"
              style={{ width: ring.size, height: ring.size, borderColor: ring.border }}
            />
          )
        )}
      </div>

      {/* Avatar */}
      <img
        src="/assets/emonical-avatar.png"
        alt="Avatar emocional"
        loading="lazy"
        width={112}
        height={112}
        className="w-24 h-24 sm:w-28 sm:h-28 mb-5 sm:mb-6 relative z-10"
      />

      {/* Título */}
      <h2
        className={`text-center text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 relative z-10 
                    bg-gradient-to-r ${styles.titleGradientClasses}
                    bg-clip-text text-transparent`}
        style={{ textShadow: styles.titleShadow }}
      >
        {isLogged ? (
          <>
            Hola,&nbsp;
            <span className="underline decoration-violet-400/70 decoration-wavy underline-offset-4">
              {user.email || "Invitad@"}
            </span>
          </>
        ) : (
          <>Tu portal en <span>Emonical NeoGlow</span></>
        )}
      </h2>

      {/* Subtexto */}
      <p
        className="relative z-10 text-center max-w-md mb-8 sm:mb-10 leading-relaxed 
                    text-xs sm:text-sm md:text-base"
        style={{ color: styles.subtitleColor }}
      >
        {isLogged
          ? "Explora los datos de tu cuenta y viaja por tu universo emocional dentro de Emonical 💜"
          : "Inicia sesión o crea tu cuenta para guardar tus publicaciones, comentar y conectar con otras almas estelares ✨"}
      </p>

      {/* Contenedor principal */}
      <div className="relative z-20 w-full max-w-md sm:max-w-lg">
        {/* Marco RGB: solo gira si se permite animación */}
        {animate ? (
          <motion.div
            className="absolute -inset-[2px] rounded-[24px] sm:rounded-[28px]
                       bg-[conic-gradient(from_180deg,rgba(167,139,250,0.8),rgba(56,189,248,0.8),rgba(244,114,182,0.8),rgba(167,139,250,0.8))]
                       opacity-70 blur-[1px] will-change-transform"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          />
        ) : (
          <div
            className="absolute -inset-[2px] rounded-[24px] sm:rounded-[28px]
                       bg-[conic-gradient(from_180deg,rgba(167,139,250,0.4),rgba(56,189,248,0.4),rgba(244,114,182,0.4),rgba(167,139,250,0.4))]
                       opacity-60 blur-[1px]"
          />
        )}

        {/* Tarjeta principal */}
        <div
          className="relative rounded-[22px] sm:rounded-[26px] backdrop-blur-xl
                     p-5 sm:p-6 md:p-7 border"
          style={{
            backgroundColor: styles.cardBg,
            borderColor: styles.cardBorder,
            boxShadow: styles.cardShadow,
          }}
        >
          <Suspense fallback={<div className="text-center text-sm opacity-70">Cargando…</div>}>
            {isLogged ? (
              <div className="space-y-5 sm:space-y-6">
                <div
                  className="rounded-2xl sm:rounded-3xl backdrop-blur-xl border p-4 sm:p-5"
                  style={{ backgroundColor: styles.innerCardBg, borderColor: styles.innerCardBorder }}
                >
                  <PerfilCard user={user} />
                </div>

                <div className="flex justify-center pt-1 sm:pt-2">
                  <button
                    onClick={logout}
                    className="px-7 sm:px-8 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold 
                               text-red-50 border border-red-400/50
                               bg-gradient-to-r from-red-600/80 to-rose-500/90
                               hover:opacity-95 active:opacity-90 transition"
                  >
                    Cerrar sesión
                  </button>
                </div>
              </div>
            ) : (
              <div
                className="rounded-2xl sm:rounded-3xl backdrop-blur-xl border p-4 sm:p-5 md:p-6"
                style={{ backgroundColor: styles.loginCardBg, borderColor: styles.loginCardBorder }}
              >
                <Login />
              </div>
            )}
          </Suspense>
        </div>
      </div>
    </main>
  );
}

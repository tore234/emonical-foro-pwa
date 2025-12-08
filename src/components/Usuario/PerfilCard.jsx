// src/components/Usuario/PerfilCard.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  UserCircleIcon,
  EnvelopeIcon,
  IdentificationIcon,
} from "@heroicons/react/24/outline";

// 🫧 Importa tus avatares emocionales
import avatarAnsiedad from "../../assets/emociones/emonical_avatar_ansiedad.png";
import avatarEnojo from "../../assets/emociones/emonical_avatar_enojo.png";
import avatarEstres from "../../assets/emociones/emonical_avatar_estres.png";
import avatarMiedo from "../../assets/emociones/emonical_avatar_miedo.png";
import avatarNeutral from "../../assets/emociones/emonical_avatar_neutral.png";
import avatarTristeza from "../../assets/emociones/emonical_avatar_tristeza.png";

// Lista de emociones disponibles
const AVATARES_EMOCION = [
  { id: "neutral", label: "Neutral", src: avatarNeutral },
  { id: "ansiedad", label: "Ansiedad", src: avatarAnsiedad },
  { id: "estres", label: "Estrés", src: avatarEstres },
  { id: "miedo", label: "Miedo", src: avatarMiedo },
  { id: "tristeza", label: "Tristeza", src: avatarTristeza },
  { id: "enojo", label: "Enojo", src: avatarEnojo },
];

export default function PerfilCard({ user }) {
  const [avatarSeleccionado, setAvatarSeleccionado] = useState(null);

  if (!user) return null;

  const isAnon = user.isAnonymous;
  const email = user.email || "Invitado";
  const name =
    user.displayName || (!isAnon ? email.split("@")[0] : "Usuario invitado");

  // 🔄 Cargar avatar guardado en localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("emonical-avatar");
      if (stored) {
        setAvatarSeleccionado(stored);
      }
    } catch (err) {
      console.error("No se pudo leer el avatar guardado:", err);
    }
  }, []);

  // 💾 Guardar selección cada vez que cambie
  useEffect(() => {
    if (!avatarSeleccionado) return;
    try {
      localStorage.setItem("emonical-avatar", avatarSeleccionado);
    } catch (err) {
      console.error("No se pudo guardar el avatar:", err);
    }
  }, [avatarSeleccionado]);

  // Avatar que se muestra en la tarjeta
  const avatarVisible = avatarSeleccionado || user.photoURL || null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="
        relative overflow-hidden rounded-3xl 
        border shadow-[0_8px_30px_rgba(0,0,0,0.35)]
        p-6 md:p-7 space-y-5 backdrop-blur-2xl
      "
      style={{
        background: "var(--card-bg)",
        borderColor: "var(--card-border)",
        color: "var(--text-main)",
      }}
    >
      {/* halo suave de fondo */}
      <motion.div
        className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full blur-3xl opacity-70"
        style={{ background: "var(--glow-purple)" }}
        animate={{ opacity: [0.35, 0.7, 0.35] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* HEADER: avatar + info básica */}
      <div className="relative z-10 flex items-center gap-4">
        <div className="relative">
          <div className="h-14 w-14 rounded-full bg-gradient-to-br from-[#B4C5F7] via-[#C5D4F5] to-[#CEEBF8] flex items-center justify-center shadow-md overflow-hidden">
            {avatarVisible ? (
              <img
                src={avatarVisible}
                alt="Avatar emocional"
                className="h-12 w-12 rounded-full object-cover border border-white/60"
              />
            ) : (
              <UserCircleIcon className="h-10 w-10 text-white drop-shadow" />
            )}
          </div>
        </div>

        <div className="flex-1">
          <p
            className="text-xs uppercase tracking-wide font-semibold"
            style={{ color: "var(--text-soft)" }}
          >
            Cuenta activa
          </p>
          <h3
            className="text-lg font-semibold leading-snug"
            style={{ color: "var(--text-main)" }}
          >
            {name}
          </h3>
          <p
            className="text-[11px] mt-0.5"
            style={{ color: "var(--text-soft)" }}
          >
            {isAnon
              ? "Modo invitado — tus datos no se guardan permanentemente."
              : "Tu sesión está vinculada a este correo."}
          </p>
        </div>
      </div>

      {/* DATOS DE LA CUENTA */}
      <div
        className="relative z-10 space-y-2 rounded-2xl px-4 py-3 border"
        style={{
          background: "var(--chip-bg, rgba(0,0,0,0.12))",
          borderColor: "var(--card-border)",
        }}
      >
        {!isAnon && (
          <div
            className="flex items-center gap-2 text-sm"
            style={{ color: "var(--text-main)" }}
          >
            <EnvelopeIcon
              className="h-4 w-4"
              style={{ color: "var(--glow-purple)" }}
            />
            <span className="truncate">{email}</span>
          </div>
        )}

        <div
          className="flex items-center gap-2 text-xs"
          style={{ color: "var(--text-soft)" }}
        >
          <IdentificationIcon
            className="h-4 w-4"
            style={{ color: "var(--glow-purple)" }}
          />
          <span>
            Tipo de cuenta:{" "}
            <span className="font-semibold" style={{ color: "var(--text-main)" }}>
              {isAnon ? "Invitada" : "Registrada"}
            </span>
          </span>
        </div>
      </div>

      {/* 🔮 Selector de emoción / avatar */}
      <div className="relative z-10">
        <p
          className="text-xs font-semibold mb-2"
          style={{ color: "var(--text-soft)" }}
        >
          Elige la emoción de tu avatar
        </p>
        <p
          className="text-[11px] mb-3"
          style={{ color: "var(--text-soft)" }}
        >
          Selecciona cómo quieres que se vea tu burbujita en Emonical Foro 💫
        </p>

        <div className="flex flex-wrap gap-3">
          {AVATARES_EMOCION.map((item) => {
            const isActive = avatarSeleccionado === item.src;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setAvatarSeleccionado(item.src)}
                className={`relative rounded-full p-[2px] transition-all ${
                  isActive
                    ? "ring-2 ring-offset-2 ring-[#B29DD9] ring-offset-transparent"
                    : "hover:ring-2 hover:ring-offset-2 hover:ring-[#C5D4F5]"
                }`}
              >
                <img
                  src={item.src}
                  alt={item.label}
                  className="h-10 w-10 rounded-full object-cover bg-[#F3EEFF]"
                />
                <span
                  className="block text-[10px] text-center mt-1"
                  style={{ color: "var(--text-soft)" }}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mensaje amable */}
      <p
        className="relative z-10 text-[11px] md:text-xs mt-1"
        style={{ color: "var(--text-soft)" }}
      >
        🎈 Desde aquí podrás gestionar tu sesión y, muy pronto, ver tu
        actividad dentro de{" "}
        <span className="font-semibold" style={{ color: "var(--text-main)" }}>
          Emonical Foro
        </span>
        .
      </p>
    </motion.div>
  );
}

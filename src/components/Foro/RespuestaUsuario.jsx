// src/components/Foro/RespuestaUsuario.jsx
import { motion } from "framer-motion";
import {
  UserCircleIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";

export default function RespuestaUsuario({ data }) {
  if (!data) return null;

  const { usuario, texto, fecha } = data;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full bg-white/70 backdrop-blur-xl border border-white/40 
                 rounded-3xl p-5 shadow-[0_6px_25px_rgba(0,0,0,0.06)]
                 flex flex-col gap-3"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <UserCircleIcon className="h-9 w-9 text-[#A78BFA]" />

        <div>
          <p className="text-[#2D2D2D] font-semibold text-sm">{usuario}</p>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <CalendarDaysIcon className="h-4 w-4" />
            {fecha}
          </div>
        </div>
      </div>

      {/* Texto del comentario */}
      <p className="text-[#3A3A3A] text-sm leading-relaxed">
        {texto}
      </p>
    </motion.div>
  );
}

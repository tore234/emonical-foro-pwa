import { motion } from "framer-motion";
import DaniImg from "../../assets/psicologo-dani.png";

export default function PsicologoCard() {
  const frasesDani = [
    "“Un paso define una cosa: avanzar. No temas darlo; así es como inicia todo cambio.”",
    "“El dolor no es el enemigo, es el recordatorio de que sigues vivo y luchando.”",
    "“Amarte no es egoísmo, es reconocer tu propio valor. Cuida de ti como cuidas de quien amas.”",
    "“Respira, comprende tu instante y deja que el presente sea suficiente.”",
    "“La valentía no es la ausencia del miedo, sino avanzar incluso con él. Atrévete a soñar.”",
    "“Renovar tu espacio interior es tan importante como limpiar el exterior. Da paso a lo nuevo.”",
    "“Emoción significa movimiento. Sigue buscando, sigue creciendo; ahí habita la vida.”",
  ];

  const fraseAleatoria =
    frasesDani[Math.floor(Math.random() * frasesDani.length)];

  return (
    <section className="relative z-10 mt-24">
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-3xl font-bold text-[#B29DD9] mb-2">
          💬 Consejos del Psic. Christian Daniel García Sánchez
        </h3>
        <p className="text-gray-700 max-w-xl mx-auto leading-relaxed">
          Reflexiones para reconectar contigo mismo y aprender a vivir con
          equilibrio emocional 🌿
        </p>
      </motion.div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-10">
        {/* Imagen del psicólogo */}
        <motion.div
          className="relative w-52 h-52 rounded-full overflow-hidden border-4 border-[#B29DD9]/50 shadow-xl shadow-[#B29DD9]/20"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={DaniImg}
            alt="Psic. Christian Daniel García Sánchez"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Frase destacada */}
        <motion.div
          className="max-w-lg bg-white/80 backdrop-blur-lg p-6 rounded-3xl border border-white/40 shadow-md text-center md:text-left"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-gray-800 italic text-lg leading-relaxed mb-3">
            {fraseAleatoria}
          </p>
          <p className="text-sm text-[#B29DD9] font-semibold">
            — Psic. Christian Daniel García Sánchez
          </p>
        </motion.div>
      </div>

      {/* Carrusel de frases */}
      <motion.div
        className="mt-14 flex gap-5 overflow-x-auto px-4 pb-4 scrollbar-hide"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {frasesDani.map((frase, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="min-w-[260px] sm:min-w-[320px] bg-gradient-to-br from-[#CEEBF8]/60 via-[#B4C5F7]/50 to-[#B29DD9]/50 
            p-5 rounded-2xl shadow-lg backdrop-blur-md border border-white/40"
          >
            <p className="text-gray-800 italic text-sm leading-relaxed mb-3">
              {frase}
            </p>
            <span className="text-[#2D2D2D] text-xs font-semibold">
              — Psic. Christian Daniel García Sánchez
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

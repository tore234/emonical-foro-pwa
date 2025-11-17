// src/components/Bot/BotMessage.jsx
export default function BotMessage({ mensaje }) {
  return (
    <div className="bg-gradient-to-r from-[#CEEBF8]/60 via-[#B4C5F7]/50 to-[#B29DD9]/60 border border-white/40 
                    rounded-2xl shadow-md p-4 my-3 text-gray-800 backdrop-blur-md transition-all hover:scale-[1.01]">
      <p className="leading-relaxed mb-2">{mensaje.contenido}</p>
      <span className="text-sm text-[#B29DD9] font-medium block text-right">
        — {mensaje.autor}
      </span>
    </div>
  );
}

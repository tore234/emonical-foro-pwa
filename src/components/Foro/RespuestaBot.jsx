export default function RespuestaBot({ mensaje }) {
  return (
    <div className="bg-gradient-to-r from-[#CEEBF8]/50 to-[#B29DD9]/40 p-4 rounded-2xl shadow-md border border-white/30 mt-3">
      <p className="text-gray-800">{mensaje.contenido}</p>
      <span className="block text-right text-sm text-[#B29DD9] font-medium">
        — {mensaje.autor}
      </span>
    </div>
  );
}

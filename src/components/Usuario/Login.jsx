import { useState } from "react";
import { auth } from "../../firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInAnonymously,
} from "firebase/auth";
import { motion } from "framer-motion";
import {
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login");
  const [loading, setLoading] = useState(false);

  // Métodos de autenticación
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      setLoading(true);
      await signInWithPopup(auth, provider);
    } catch (error) {
      alert("Error al iniciar sesión con Google");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async () => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Cuenta creada correctamente 🫶");
    } catch (error) {
      alert("Error al registrar: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAnonLogin = async () => {
    try {
      setLoading(true);
      await signInAnonymously(auth);
    } catch (error) {
      alert("Error al acceder de forma anónima");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative bg-white/70 backdrop-blur-2xl border border-white/40 rounded-3xl shadow-[0_4px_30px_rgba(176,176,176,0.15)] p-8 overflow-hidden"
    >
      {/* Luz de fondo animada */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#B4C5F7]/60 via-[#B29DD9]/40 to-[#CEEBF8]/60 blur-3xl opacity-60"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Contenido principal */}
      <div className="relative z-10">
        <h2 className="text-3xl font-bold text-center text-[#2D2D2D] mb-6 tracking-tight">
          {mode === "login" ? "Iniciar sesión" : "Crear cuenta"}
        </h2>

        {/* Campos */}
        <div className="space-y-4">
          <div className="flex items-center border border-[#C5D4F5] rounded-xl p-3 bg-white/60 focus-within:ring-2 ring-[#B29DD9] transition-all">
            <EnvelopeIcon className="h-5 w-5 text-[#2D2D2D]/70 mr-2" />
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full outline-none bg-transparent text-gray-700 placeholder-gray-400"
            />
          </div>

          <div className="flex items-center border border-[#C5D4F5] rounded-xl p-3 bg-white/60 focus-within:ring-2 ring-[#B29DD9] transition-all">
            <LockClosedIcon className="h-5 w-5 text-[#2D2D2D]/70 mr-2" />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full outline-none bg-transparent text-gray-700 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Botón principal */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={mode === "login" ? handleEmailLogin : handleRegister}
          disabled={loading}
          className="w-full mt-6 bg-gradient-to-r from-[#B29DD9] to-[#B4C5F7] text-white font-semibold py-2.5 rounded-xl shadow-[0_0_15px_rgba(178,157,217,0.3)] hover:shadow-[0_0_25px_rgba(178,157,217,0.45)] transition-all"
        >
          {loading
            ? "Cargando..."
            : mode === "login"
            ? "Iniciar sesión"
            : "Crear cuenta"}
        </motion.button>

        {/* Alternar modo */}
        <p className="text-center text-sm text-gray-600 mt-3">
          {mode === "login" ? (
            <>
              ¿No tienes cuenta?{" "}
              <span
                onClick={() => setMode("register")}
                className="text-[#B29DD9] font-semibold cursor-pointer hover:underline"
              >
                Regístrate
              </span>
            </>
          ) : (
            <>
              ¿Ya tienes cuenta?{" "}
              <span
                onClick={() => setMode("login")}
                className="text-[#B29DD9] font-semibold cursor-pointer hover:underline"
              >
                Inicia sesión
              </span>
            </>
          )}
        </p>

        {/* Métodos alternativos */}
        <div className="mt-8 border-t border-white/50 pt-5 space-y-3">
          <p className="text-center text-sm text-gray-500">O continúa con</p>

          {/* Google */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            onClick={handleGoogleLogin}
            disabled={loading}
            className="flex items-center justify-center w-full border py-2.5 rounded-xl bg-white/90 hover:bg-gray-50 shadow-sm transition"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google logo"
              className="h-5 w-5 mr-2"
            />
            <span className="text-gray-700 font-medium">
              Continuar con Google
            </span>
          </motion.button>

          {/* Invitado */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            onClick={handleAnonLogin}
            disabled={loading}
            className="flex items-center justify-center w-full border py-2.5 rounded-xl bg-[#CEEBF8]/60 hover:bg-[#C5D4F5]/60 transition"
          >
            <UserIcon className="h-5 w-5 mr-2 text-[#2D2D2D]" />
            <span className="text-[#2D2D2D] font-medium">
              Entrar como invitado
            </span>
          </motion.button>
        </div>

        {/* Cerrar sesión */}
        <div className="mt-5 text-center">
          <button
            onClick={() => auth.signOut()}
            className="text-red-500 flex items-center justify-center mx-auto hover:text-red-700 transition"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5 mr-1" />
            Cerrar sesión
          </button>
        </div>
      </div>
    </motion.div>
  );
}

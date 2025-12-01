// src/pages/Descubrir.jsx
import { motion } from "framer-motion";
import DescubrirApp from "../components/Descubrir/DescubrirApp";

export default function Descubrir() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen pt-6"
    >
      <DescubrirApp />
    </motion.div>
  );
}

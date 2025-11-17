import express from "express";
import { getBotReply } from "../services/openaiService.js";

const router = express.Router();

router.post("/ask", async (req, res) => {
  try {
    const { pregunta } = req.body;

    const respuesta = await getBotReply(pregunta);

    res.json({ respuesta });
  } catch (error) {
    console.error("Error en /api/foro/ask:", error);
    res.status(500).json({ respuesta: "Hubo un error al procesar la pregunta 😔" });
  }
});

export default router;

import express from "express";
import cors from "cors";
import forumRouter from "./routes/forum.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/foro", forumRouter);

app.listen(5000, () =>
  console.log("🚀 Servidor activo en http://localhost:5000")
);

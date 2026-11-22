import express from "express";
import cors from "cors";
import router from "./routes/indexRoutes.js";

const app = express();

// Middlewares Globais
app.use(cors());
app.use(express.json());

// Middleware de Rotas
app.use(router);

export default app;

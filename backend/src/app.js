import express from "express";
import helmet from "helmet";
import cors from "cors";
import router from "./routes/indexRoutes.js";
import { limitadorGeral } from "./middlewares/rateLimitMiddleware.js";

const app = express();

// Middlewares Globais
app.use(helmet());
app.use(cors());
app.use(express.json());

// Middleware Rate Limit (Limitador de Requisições)
app.use(limitadorGeral);

// Middleware de Rotas
app.use(router);

export default app;

import rateLimit from "express-rate-limit";

export const limitadorGeral = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    limit: 100,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: { erro: "Muitas requisições. Tente novamente mais tarde." },
});

export const limitadorCadastro = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    limit: 100, // 5
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: { erro: "Muitas requisições. Tente novamente mais tarde." },
});

export const limitadorLogin = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hora
    limit: 100, // 5
    skipSuccessfulRequests: true,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: { erro: "Muitas requisições. Tente novamente mais tarde." },
});

import { Router } from "express";
import { limitadorCadastro, limitadorLogin } from "../middlewares/rateLimitMiddleware.js";
import userController from "../controllers/userController.js";
import { validarCadastro } from "../middlewares/userMiddleware.js";
import { validarLogin } from "../middlewares/userMiddleware.js";

const routerUser = Router();

routerUser.post("/cadastro", [limitadorCadastro, validarCadastro], userController.cadastro,
);
routerUser.post("/login", [limitadorLogin, validarLogin], userController.login);

export default routerUser;

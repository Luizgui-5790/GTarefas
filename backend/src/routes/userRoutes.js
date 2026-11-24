import { Router } from "express";
import { limitadorCadastro, limitadorLogin } from "../middlewares/rateLimitMiddleware.js";
import { validarCadastro, validarLogin } from "../middlewares/userMiddleware.js";
import userController from "../controllers/userController.js";

const routerUser = Router();

routerUser.post("/cadastro", [limitadorCadastro, validarCadastro], userController.cadastro);
routerUser.post("/login", [limitadorLogin, validarLogin], userController.login);

export default routerUser;

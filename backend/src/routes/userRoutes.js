import { Router } from "express";
import userController from "../controllers/userController.js";
import { validarCadastro } from "../middlewares/userMiddleware.js";
import { validarLogin } from "../middlewares/userMiddleware.js";

const routerUser = Router();

routerUser.post("/cadastro", validarCadastro, userController.cadastro);
routerUser.post("/login", validarLogin, userController.login);

export default routerUser;

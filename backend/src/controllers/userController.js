import userServices from "../services/userServices.js";

class UserController {
    async cadastro(req, res) {
        const { nome, email, senha } = req.body;

        const novoUsuario = await userServices.cadastro({
            nome,
            email,
            senha,
        });

        res.status(200).json({
            cadastrado: true,
            novoUsuario,
        });
    }

    async login(req, res) {}
}

const userController = new UserController();

export default userController;

import userRepository from "../repositories/userRepository.js";
import AppError from "../middlewares/errorMiddleware.js";
import bcrypt from "bcrypt";

class UserServices {
    async cadastro(usuario) {
        const { nome, email } = usuario;

        const usuarioExiste = await userRepository.buscarPorEmail(email);

        if (usuarioExiste) {
            throw new AppError("Esse e-mail já está cadastrado", 409);
        } else {
            const hashSenha = await bcrypt.hash(usuario.senha, 10);

            const novoUsuario = await userRepository.cadastrar({
                nome,
                email,
                senha: hashSenha,
            });

            delete usuario.senha;

            return novoUsuario;
        }
    }

    async login() {}
}

const userServices = new UserServices();

export default userServices;

import userRepository from "../repositories/userRepository.js";
import { AppError } from "../middlewares/errorMiddleware.js";
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

    async login(usuario) {
        const { email, senha } = usuario;

        const usuarioExiste = await userRepository.buscarPorEmail(email);

        if (!usuarioExiste) {
            throw new AppError("Sem cadastrado", 404);
        } else {
            const senhaCorreta = await bcrypt.compare(
                senha,
                usuarioExiste.senha,
            );

            if (!senhaCorreta) {
                throw new AppError("E-mail ou senha incorretos", 401);
            }

            return usuarioExiste;
        }
    }
}

const userServices = new UserServices();

export default userServices;

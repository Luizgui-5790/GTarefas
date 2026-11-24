import userRepository from "../repositories/userRepository.js";
import { AppError } from "../errors/indexError.js";
import * as argon2 from "argon2";

class UserServices {
    async cadastro(usuario) {
        const { nome, email } = usuario;

        const usuarioExiste = await userRepository
            .buscarPorEmail(email)
            .catch(() => {
                throw new AppError("Erro interno ao processar a solicitação", 500);
            });

        if (usuarioExiste) {
            throw new AppError("Esse e-mail já está cadastrado", 409);
        } else {
            const hashSenha = await argon2
                .hash(usuario.senha)
                .catch(() => {
                    throw new AppError("Erro interno ao processar a solicitação", 500);
                });

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

        const usuarioExiste = await userRepository
            .buscarPorEmail(email)
            .catch(() => {
                throw new AppError("Erro interno ao processar a solicitação", 500);
            });

        if (!usuarioExiste) {
            throw new AppError("Sem cadastrado", 404);
        } else {
            const senhaCorreta = await argon2
                .verify(usuarioExiste.senha, senha)
                .catch(() => {
                    throw new AppError("Erro interno ao processar a solicitação", 500);
                });

            if (!senhaCorreta) {
                throw new AppError("E-mail ou senha incorretos", 401);
            }

            return usuarioExiste;
        }
    }
}

const userServices = new UserServices();

export default userServices;

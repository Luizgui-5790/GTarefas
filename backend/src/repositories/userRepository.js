import prisma from "../config/prismaDB.js";

class UserRepository {
    async buscarPorEmail(email) {
        const usuario = await prisma.usuario.findUnique({
            where: { email },
        });

        return usuario;
    }

    async cadastrar(usuario) {
        const { nome, email, senha } = usuario;

        const novoUsuario = await prisma.usuario.create({
            data: { nome, email, senha },
        });

        return novoUsuario;
    }
}

const userRepository = new UserRepository();

export default userRepository;

import prisma from "../config/prismaDB.js";

class UserRepository {
    async buscarPorEmail(email) {
        const usuario = await prisma.usuario.findUnique({
            where: { email },
        });

        return usuario;
    }

    async cadastrar(usuario) {
        const novoUsuario = await prisma.usuario.create({
            data: usuario,
        });

        return novoUsuario;
    }
}

const userRepository = new UserRepository();

export default userRepository;

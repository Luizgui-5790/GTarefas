import z from "zod";

export function validarCadastro(req, res, next) {
    const { nome, email, senha } = req.body;

    const nomeZod = z
        .string({ required_error: "O nome é obrigatório" })
        .trim()
        .min(3, "Nome deve ter pelo menos 3 letras")
        .max(200, "Nome não deve ter mais de 200 letras");

    const senhaZod = z
        .string({ required_error: "A senha é obrigatória" })
        .min(8, "Senha deve ter 8 ou mais caracteres")
        .max(25, "Senha não deve ter mais de 25 caracteres")
        .regex(/[A-Z]/, "Pelo menos um 1 letra maiúscula")
        .regex(/[a-z]/, "Pelo menos um 1 letra minúscula")
        .regex(/[0-9]/, "Pelo menos um 1 número")
        .regex(/[!@#$%^&*(),.?":{}|<>_-]/, "Pelo menos 1 caracter especial")
        .regex(/^\S*$/, "Senha não deve ter espaços");

    const emailZod = z
        .string({ required_error: "O e-mail é obrigatório" })
        .trim()
        .min(1, "O e-mail não pode estar vazio")
        .email("E-mail inválido");

    const userSchema = z.object({
        nome: nomeZod,
        email: emailZod,
        senha: senhaZod,
    });

    const usuarioValido = userSchema.safeParse({ nome, senha, email });

    if (!usuarioValido.success) {
        return res.status(409).json({
            valido: usuarioValido.success,
            erros: z.flattenError(usuarioValido.error).fieldErrors,
        });
    } else {
        next();
    }
}

export function validarLogin(req, res, next) {
    next();
}

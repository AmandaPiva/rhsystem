"use server";

import { hashSenha } from "@/lib/crypto";
import prismaCriaUsuario from "@/server/usuario/usuario";
import { TipoUsuario } from "@prisma/client";

interface IConfiguracaoCriaUsuarioAction {
    nome: string;
    email: string;
    senha: string;
    status: boolean;
    confirmacaoSenha: string;
    tipoUsuario: TipoUsuario;
    funcionario: boolean;
}

export default async function configuracaoCriaUsuarioAction({
    nome,
    email,
    senha,
    status,
    tipoUsuario,

}: IConfiguracaoCriaUsuarioAction) {
   
    const senhaHashed = await hashSenha(senha);
    const usuarioId = await prismaCriaUsuario({
        nome,
        email,
        senha: senhaHashed,
        status,
        tipo: tipoUsuario,
    });

    return usuarioId;
}
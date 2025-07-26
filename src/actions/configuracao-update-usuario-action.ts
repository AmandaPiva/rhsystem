"use server";

import prismaBuscaUsuario from "@/server/usuario/buscar-usuario";
import prismaAtualizaUsuario from "@/server/usuario/update-usuario";

interface IConfiguracaoUpdateUsuarioAction {
  id: string;
  nome: string;
  email: string;
  status: boolean;
  tipoUsuario: string;
}

export default async function configuracaoUpdateUsuarioAction({
  id,
  nome,
  email,
  status,
  tipoUsuario,
}: IConfiguracaoUpdateUsuarioAction) {
  const usuarioExistente = await prismaBuscaUsuario({
    pelo: "id",
    valor: id,
  });

  if (!usuarioExistente) {
    throw new Error("Usuário não encontrado");
  }

  const usuarioAtualizado = await prismaAtualizaUsuario({
    id: usuarioExistente.id,
    nome: nome,
    email: email,
    status: status,
    tipoUsuario: tipoUsuario,
  });
  return usuarioAtualizado;
}

"use server";

import prismaAtualizaStatusUsuario from "@/server/usuario/atualiza-status-user";
import prismaBuscaUsuario from "@/server/usuario/buscar-usuario";

interface IConfiguracaoMudaStatusUsuarioAction {
  id: string;
  status: boolean;
}

export default async function configuracaoMudaStatusUsuarioAction({
  id,
  status,
}: IConfiguracaoMudaStatusUsuarioAction) {
  const usuarioExistente = await prismaBuscaUsuario({
    pelo: "id",
    valor: id,
  });

  if (!usuarioExistente) {
    throw new Error("Usuário não encontrado");
  }

  const statusUserAtualizado = await prismaAtualizaStatusUsuario({
    id: usuarioExistente.id,
    status: status,
  });
  console.log(`Atualizando usuário com ID ${id} para status ${status}`);

  // Retorna o ID do usuário atualizado
  return statusUserAtualizado;
}

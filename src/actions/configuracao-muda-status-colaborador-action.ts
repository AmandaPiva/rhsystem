"use server";

import prismaAtualizaStatusColaborador from "@/server/colaboradores/atualiza-status-colaborador";
import prismaBuscaColaborador from "@/server/colaboradores/buscar-colaborador";
import prismaAtualizaColaborador from "@/server/colaboradores/update-colaborador";

interface IConfiguracaoMudaStatusColaboradorAction {
  id: string;
  status: boolean;
}

export default async function configuracaoMudaStatusColaboradorAction({
  id,
  status,
}: IConfiguracaoMudaStatusColaboradorAction) {
  const colaboradorExistente = await prismaBuscaColaborador({
    pelo: "id",
    valor: id,
  });

  if (!colaboradorExistente) {
    throw new Error("Colaborador não encontrado");
  }

  const statusColaboradorAtualizado = await prismaAtualizaStatusColaborador({
    id: colaboradorExistente.id,
    status: status,
  });

  return statusColaboradorAtualizado;
}

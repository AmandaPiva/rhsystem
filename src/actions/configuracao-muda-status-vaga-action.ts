"use server";

import prismaAtualizaStatusVaga from "@/server/vagas/atualiza-status-vaga";
import prismaBuscaVaga from "@/server/vagas/buscar-vaga";
import { StatusVaga } from "@prisma/client";

interface IConfiguracaoMudaStatusVagaAction {
  id: string;
  status: StatusVaga;
}

export default async function configuracaoMudaStatusVagaAction({
  id,
  status,
}: IConfiguracaoMudaStatusVagaAction) {
  const vagaExistente = await prismaBuscaVaga({
    pelo: "id",
    valor: id,
  });

  if (!vagaExistente) {
    throw new Error("Vaga não encontrada");
  }

  const statusVagaAtualizado = await prismaAtualizaStatusVaga({
    id: vagaExistente.id,
    status: status,
  });

  return statusVagaAtualizado;
}

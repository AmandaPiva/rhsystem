"use server";

import prismaAtualizaStatusCandidato from "@/server/candidatos/atualiza-status-candidato";
import prismaBuscaCandidato from "@/server/candidatos/buscar-candidato";

interface IConfiguracaoMudaStatusCandidatoAction {
  id: string;
  status: boolean;
}

export default async function configuracaoMudaStatusCandidatoAction({
  id,
  status,
}: IConfiguracaoMudaStatusCandidatoAction) {
  const candidatoExistente = await prismaBuscaCandidato({
    pelo: "id",
    valor: id,
  });

  if (!candidatoExistente) {
    throw new Error("Candidato não encontrado");
  }

  const statusCandidatoAtualizado = await prismaAtualizaStatusCandidato({
    id: candidatoExistente.id,
    status: status,
  });
  return statusCandidatoAtualizado;
}

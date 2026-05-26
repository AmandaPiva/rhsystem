"use server";

import prismaAtualizaEtapaCandidato from "@/server/candidatos/atualiza-etapa-candidato";
import prismaBuscaCandidato from "@/server/candidatos/buscar-candidato";
import { EtapasProcessoSeletivo } from "@prisma/client";

interface IConfiguracaoMudaEtapaCandidatoAction {
  id: string;
  etapa: EtapasProcessoSeletivo;
}

export default async function configuracaoMudaEtapaCandidatoAction({
  id,
  etapa,
}: IConfiguracaoMudaEtapaCandidatoAction) {
  const candidatoExistente = await prismaBuscaCandidato({
    pelo: "id",
    valor: id,
  });

  if (!candidatoExistente) {
    throw new Error("Candidato não encontrado");
  }

  const candidatoAtualizado = await prismaAtualizaEtapaCandidato({
    id: candidatoExistente.id,
    etapa,
  });

  return candidatoAtualizado;
}

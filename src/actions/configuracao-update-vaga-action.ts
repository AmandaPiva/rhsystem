"use server";

import prismaBuscaVaga from "@/server/vagas/buscar-vaga";
import prismaAtualizaVaga from "@/server/vagas/update-vaga";

interface IConfiguracaoUpdateVagaAction {
  id: string;
  nome: string | null;
  descricao: string | null;
  setorId: string | undefined;
  dataFinalizacao: Date | null;
}

export default async function configuracaoUpdateVagaAction({
  id,
  nome,
  descricao,
  dataFinalizacao,
}: IConfiguracaoUpdateVagaAction) {
  const vagaExistente = await prismaBuscaVaga({
    pelo: "id",
    valor: id,
  });

  if (!vagaExistente) {
    throw new Error("Vaga não encontrada");
  }

  const vagaAtualizada = await prismaAtualizaVaga({
    id: vagaExistente.id,
    nome: nome,
    descricao: descricao,
    dataFinalizacao: dataFinalizacao,
  });
  return vagaAtualizada;
}

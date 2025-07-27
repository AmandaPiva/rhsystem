"use server";

import prismaBuscaSetor from "@/server/setores/buscar-setor";
import prismaAtualizaSetor from "@/server/setores/update-setor";

interface IConfiguracaoUpdateSetorAction {
  id: string;
  nome: string;
  descricao: string;
}

export default async function configuracaoUpdateSetorAction({
  id,
  nome,
  descricao,
}: IConfiguracaoUpdateSetorAction) {
  const setorExistente = await prismaBuscaSetor({
    pelo: "id",
    valor: id,
  });

  if (!setorExistente) {
    throw new Error("Setor não encontrado");
  }
  const setorAtualizado = await prismaAtualizaSetor({
    id: setorExistente.id,
    nome: nome,
    descricao: descricao,
  });

  return setorAtualizado;
}

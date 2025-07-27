"use server";

import prismaCriaSetor from "@/server/setores/cria-setor";

interface IConfiguracaoCriaSetorAction {
  nome: string;
  descricao: string;
}

export default async function configuracaoCriaSetorAction({
  nome,
  descricao,
}: IConfiguracaoCriaSetorAction) {
  const setorId = await prismaCriaSetor({
    nome,
    descricao,
  });

  return setorId;
}

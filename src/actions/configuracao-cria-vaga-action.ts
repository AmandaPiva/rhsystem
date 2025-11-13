"use server";

import prismaCriaVaga from "@/server/vagas/cria-vaga";
import { StatusVaga } from "@prisma/client";

interface IConfiguracaoCriaVagaAction {
  nome: string;
  descricao: string;
  status: StatusVaga;
  setorId: string;
  dataCriacao: Date;
  dataFinalizacao: Date;
  dataEntradaDoCandidato: Date | null;
}

export default async function configuracaoCriaVagaAction({
  nome,
  descricao,
  status,
  setorId,
  dataCriacao,
  dataFinalizacao,
  dataEntradaDoCandidato,
}: IConfiguracaoCriaVagaAction) {
  const vagaId = await prismaCriaVaga({
    nome,
    descricao,
    status,
    setorId,
    dataCriacao,
    dataFinalizacao,
    dataEntradaDoCandidato,
  });

  return vagaId;
}

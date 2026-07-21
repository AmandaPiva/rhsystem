"use server";

import prismaCriaFerias from "@/server/ferias/cria-ferias";

interface IConfiguracaoCriaFeriasAction {
  dataInicio: string;
  dataFim: string;
  status: boolean;
  colaboradorId: string;
}

export default async function configuracaoCriaFeriasAction({
  dataInicio,
  dataFim,
  status,
  colaboradorId,
}: IConfiguracaoCriaFeriasAction) {
  const feriasId = await prismaCriaFerias({
    dataInicio: new Date(dataInicio),
    dataFim: new Date(dataFim),
    status,
    idFuncionario: colaboradorId,
  });
  return feriasId;
}

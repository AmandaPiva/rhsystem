"use server";

import { prisma } from "@/lib/prisma";
import prismaAtualizaFerias from "@/server/ferias/update-ferias";

interface IConfiguracaoUpdateFeriasAction {
  id: string;
  dataInicio: string;
  dataFim: string;
  status: boolean;
}

export default async function configuracaoUpdateFeriasAction({
  id,
  dataInicio,
  dataFim,
  status,
}: IConfiguracaoUpdateFeriasAction) {
  const feriasExistente = await prisma.ferias.findUnique({
    where: {
      id,
    },
  });

  if (!feriasExistente) {
    throw new Error("Férias não encontrada.");
  }

  const feriasAtualizado = await prismaAtualizaFerias({
    id: feriasExistente.id,
    dataInicio: new Date(dataInicio),
    dataFim: new Date(dataFim),
    status,
  });

  return feriasAtualizado;
}

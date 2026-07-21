"use server";

import { prisma } from "@/lib/prisma";

export default async function prismaCriaFerias({
  dataInicio,
  dataFim,
  status,
  idFuncionario,
}: {
  dataInicio: Date;
  dataFim: Date;
  status: boolean;
  idFuncionario: string;
}) {
  const ferias = await prisma.ferias.create({
    data: {
      dataInicio,
      dataFim,
      status,
      idFuncionario,
    },
  });
  return ferias.id;
}

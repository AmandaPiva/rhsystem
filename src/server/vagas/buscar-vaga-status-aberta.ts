"use server";

import { prisma } from "@/lib/prisma";

export async function buscarVagasStatusAberta() {
  return prisma.vagas.findMany({
    where: {
      status: "ABERTA",
    },
    select: {
      id: true,
      nome: true,
      descricao: true,
      status: true,
      setor: {
        select: {
          id: true,
          nome: true,
        },
      },
      dataCriacao: true,
      dataFinalizacao: true,
      dataEntradaDoCandidato: true,
    },
    orderBy: {
      dataCriacao: "asc",
    },
  });
}

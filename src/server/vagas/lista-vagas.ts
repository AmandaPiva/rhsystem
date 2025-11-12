"use server";

import { prisma } from "@/lib/prisma";

export async function listaVagas() {
  return prisma.vagas.findMany({
    select: {
      id: true,
      nome: true,
      descricao: true,
      status: true,
      setorId: true,
      dataCriacao: true,
      dataFinalizacao: true,
      dataEntradaDoCandidato: true,
    },
    orderBy: {
      dataCriacao: "asc",
    },
  });
}

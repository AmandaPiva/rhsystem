"use server";

import { prisma } from "@/lib/prisma";

export async function listaColaboradores() {
  return prisma.funcionario.findMany({
    select: {
      id: true,
      nome: true,
      rg: true,
      email: true,
      status: true,
      dataNascimento: true,
      estadoCivil: true,
      tipo: true,
      setorId: true,
    },
    orderBy: {
      nome: "asc",
    },
  });
}

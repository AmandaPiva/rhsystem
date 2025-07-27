"use server";
import { prisma } from "@/lib/prisma";

export async function listaSetores() {
  return prisma.setor.findMany({
    select: {
      id: true,
      nome: true,
      descricao: true,
    },
    orderBy: {
      nome: "asc",
    },
  });
}

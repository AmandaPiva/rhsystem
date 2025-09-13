"use server";

import { prisma } from "@/lib/prisma";
import { Funcionario } from "@prisma/client";

interface IBuscaColaboradorActionRequest {
  pelo: "id" | "nome";
  valor: string;
}

export default async function prismaBuscaColaborador({
  pelo,
  valor,
}: IBuscaColaboradorActionRequest): Promise<Funcionario | null> {
  const colaborador = await prisma.funcionario.findFirst({
    where: {
      [pelo]: valor,
    },
  });

  return colaborador;
}

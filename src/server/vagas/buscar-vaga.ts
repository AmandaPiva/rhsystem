"use server";

import { prisma } from "@/lib/prisma";
import { Vagas } from "@prisma/client";

interface IBuscaVagaActionRequest {
  pelo: "id" | "nome";
  valor: string;
}

export default async function prismaBuscaVaga({
  pelo,
  valor,
}: IBuscaVagaActionRequest): Promise<Vagas | null> {
  const vaga = await prisma.vagas.findFirst({
    where: {
      [pelo]: valor,
    },
  });
  console.log("Vaga encontrada:", vaga);
  return vaga;
}

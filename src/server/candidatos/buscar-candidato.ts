"use server";

import { prisma } from "@/lib/prisma";
import { Candidatos } from "@prisma/client";

interface IBuscaCandidatoActionRequest {
  pelo: "id" | "cpf";
  valor: string;
}

export default async function prismaBuscaCandidato({
  pelo,
  valor,
}: IBuscaCandidatoActionRequest): Promise<Candidatos | null> {
  const candidato = await prisma.candidatos.findFirst({
    where: {
      [pelo]: valor,
    },
  });

  return candidato;
}

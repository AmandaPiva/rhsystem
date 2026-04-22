"use server";

import { prisma } from "@/lib/prisma";
import { Candidatos } from "@prisma/client";

interface IBuscaCandidatoPelaVagaActionRequest {
  pelo: "idVaga";
  idVaga: string;
}

export default async function prismaBuscaCandidatoPelaVaga({
  idVaga,
}: IBuscaCandidatoPelaVagaActionRequest): Promise<Candidatos[]> {
  const candidatos = await prisma.candidatos.findMany({
    where: {
      vagaId: {
        equals: idVaga,
      },
    },
  });
  return candidatos;
}

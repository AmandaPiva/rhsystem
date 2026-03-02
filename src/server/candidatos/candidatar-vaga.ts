"use server";

import { prisma } from "@/lib/prisma";
import { EtapasProcessoSeletivo } from "@prisma/client";

export default async function candidatarVaga({
  candidatoId,
  vagaId,
}: {
  candidatoId: string;
  vagaId: string;
}) {
  const candidatura = await prisma.candidatos.update({
    where: { id: candidatoId },
    data: {
      etapa: EtapasProcessoSeletivo.TRIAGEM,
      vaga: {
        connect: { id: vagaId },
      },
    },
  });
  return candidatura.id;
}

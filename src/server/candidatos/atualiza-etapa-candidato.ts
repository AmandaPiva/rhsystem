import { prisma } from "@/lib/prisma";
import { EtapasProcessoSeletivo } from "@prisma/client";

export default async function prismaAtualizaEtapaCandidato({
  id,
  etapa,
}: {
  id: string;
  etapa: EtapasProcessoSeletivo;
}) {
  const updatedCandidato = await prisma.candidatos.update({
    where: {
      id,
    },
    data: {
      etapa,
    },
  });

  return updatedCandidato;
}

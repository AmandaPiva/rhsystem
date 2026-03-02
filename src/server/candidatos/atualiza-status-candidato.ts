import { prisma } from "@/lib/prisma";

export default async function prismaAtualizaStatusCandidato({
  id,
  status,
}: {
  id: string;
  status: boolean;
}) {
  const updatedCandidato = await prisma.candidatos.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });
  return updatedCandidato;
}

import { prisma } from "@/lib/prisma";

export default async function prismaAtualizaFerias({
  id,
  dataInicio,
  dataFim,
  status,
}: {
  id: string;
  dataInicio: Date;
  dataFim: Date;
  status: boolean;
}) {
  const feriasAtualizado = await prisma.ferias.update({
    where: {
      id,
    },
    data: {
      dataInicio,
      dataFim,
      status,
    },
  });

  return feriasAtualizado.id;
}

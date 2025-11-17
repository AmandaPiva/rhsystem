import { prisma } from "@/lib/prisma";
import { StatusVaga } from "@prisma/client";

export default async function prismaAtualizaStatusVaga({
  id,
  status,
}: {
  id: string;
  status: StatusVaga;
}) {
  const updatedVaga = await prisma.vagas.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });
  return updatedVaga;
}

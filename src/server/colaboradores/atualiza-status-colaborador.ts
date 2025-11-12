import { prisma } from "@/lib/prisma";
import { de } from "date-fns/locale";

export default async function prismaAtualizaStatusColaborador({
  id,
  status,
}: {
  id: string;
  status: boolean;
}) {
  const updatedColaborador = await prisma.funcionario.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });

  return updatedColaborador;
}

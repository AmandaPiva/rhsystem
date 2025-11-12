"use server";

import { prisma } from "@/lib/prisma";

export default async function prismaDeleteVaga({ id }: { id: string }) {
  const vagaDeletada = await prisma.vagas.delete({
    where: {
      id,
    },
  });
  return vagaDeletada.id;
}

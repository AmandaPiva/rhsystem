"use server";
import { prisma } from "@/lib/prisma";

export default async function prismaCriaSetor({
  nome,
  descricao,
}: {
  nome: string;
  descricao: string;
}) {
  const setor = await prisma.setor.create({
    data: {
      nome,
      descricao,
    },
  });
  return setor.id;
}

import { prisma } from "@/lib/prisma";

export default async function prismaAtualizaSetor({
  id,
  nome,
  descricao,
}: {
  id: string;
  nome: string;
  descricao: string;
}) {
  const setorAtualizado = await prisma.setor.update({
    where: {
      id,
    },
    data: {
      nome,
      descricao,
    },
  });

  return setorAtualizado.id;
}

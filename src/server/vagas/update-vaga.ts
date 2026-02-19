import { prisma } from "@/lib/prisma";

export default async function prismaAtualizaVaga({
  id,
  nome,
  descricao,
  dataFinalizacao,
}: {
  id: string;
  nome: string | null;
  descricao: string | null;
  dataFinalizacao: Date | null;
}) {
  const vagaAtualizada = await prisma.vagas.update({
    where: {
      id,
    },
    data: {
      dataFinalizacao,
      nome,
      descricao,
    },
  });
  return vagaAtualizada;
}

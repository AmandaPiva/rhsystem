"use server";

import { prisma } from "@/lib/prisma";
import { StatusVaga } from "@prisma/client";

export default async function prismaCriaVaga({
  nome,
  descricao,
  status,
  setorId,
  dataCriacao,
}: // dataFinalizacao,
// dataEntradaDoCandidato,
{
  nome: string;
  descricao: string;
  status: StatusVaga;
  setorId: string;
  dataCriacao: Date;
  // dataFinalizacao: Date;
  // dataEntradaDoCandidato: Date | null;
}) {
  const vaga = await prisma.vagas.create({
    data: {
      nome,
      descricao,
      status,
      setorId,
      dataCriacao,
      // dataFinalizacao,
      // dataEntradaDoCandidato,
    },
  });
  return vaga.id;
}

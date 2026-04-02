"use server";

import { prisma } from "@/lib/prisma";
import { EtapasProcessoSeletivo } from "@prisma/client";

export default async function prismaCriaCandidato({
  nome,
  cpf,
  rg,
  celular,
  email,
  dataNascimento,
  etapa,
  enderecoId,
  vagaId,
}: {
  nome: string;
  cpf: string;
  rg: string;
  celular: string;
  email: string;
  dataNascimento: Date;
  etapa: EtapasProcessoSeletivo;
  enderecoId: string;
  vagaId?: string;
}) {
  const candidato = await prisma.candidatos.create({
    data: {
      nome,
      cpf,
      rg,
      celular,
      email,
      dataNascimento: new Date(dataNascimento),
      etapa,
      endereco: enderecoId
        ? { connect: { id: enderecoId } }
        : undefined,
      vaga: vagaId
        ? { connect: { id: vagaId } }
        : undefined,
    },
  });
  return candidato.id;
}

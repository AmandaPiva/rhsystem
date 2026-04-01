"use server";

import { prisma } from "@/lib/prisma";

export default async function prismaCriaCandidato({
  nome,
  cpf,
  rg,
  celular,
  email,
  dataNascimento,
  enderecoId,
}: {
  nome: string;
  cpf: string;
  rg: string;
  celular: string;
  email: string;
  dataNascimento: Date;
  enderecoId: string;
}) {
  const candidato = await prisma.candidatos.create({
    data: {
      nome,
      cpf,
      rg,
      celular,
      email,
      dataNascimento: new Date(dataNascimento),
      endereco: {
        connect: { id: enderecoId },
      },
    },
  });
  return candidato.id;
}

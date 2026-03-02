"use server";

import { prisma } from "@/lib/prisma";

export default async function listaCandidatos() {
  return prisma.candidatos.findMany({
    select: {
      id: true,
      nome: true,
      cpf: true,
      rg: true,
      celular: true,
      email: true,
      dataNascimento: true,
      endereco: {
        select: {
          id: true,
          rua: true,
          numero: true,
          bairro: true,
          cidade: true,
          estado: true,
          cep: true,
        },
      },
    },
    orderBy: {
      nome: "asc",
    },
  });
}

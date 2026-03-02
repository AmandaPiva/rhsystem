"use server";

import { prisma } from "@/lib/prisma";

export default async function prismaCriaEndereco({
  rua,
  numero,
  bairro,
  cidade,
  estado,
  cep,
}: {
  rua: string;
  numero: number;
  bairro: string;
  cidade: string;
  estado: string;
  cep: number;
}) {
  const endereco = await prisma.endereco.create({
    data: {
      rua,
      numero,
      bairro,
      cidade,
      estado,
      cep,
    },
  });
  return endereco.id;
}

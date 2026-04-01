"use server";

import { prisma } from "@/lib/prisma";
import { Endereco } from "@prisma/client";

interface IBuscaEnderecoActionRequest {
  pelo: "id" | "cep";
  valor: string;
}

export default async function prismaBuscaEndereco({
  pelo,
  valor,
}: IBuscaEnderecoActionRequest): Promise<Endereco | null> {
  const endereco = await prisma.endereco.findFirst({
    where: {
      [pelo]: valor,
    },
  });

  return endereco;
}

"use server";
import { prisma } from "@/lib/prisma";
import { Setor } from "@prisma/client";

interface IBuscaSetorActionRequest {
  pelo: "id" | "nome";
  valor: string;
}

export default async function prismaBuscaSetor({
  pelo,
  valor,
}: IBuscaSetorActionRequest): Promise<Setor | null> {
  const setor = await prisma.setor.findFirst({
    where: {
      [pelo]: valor,
    },
  });

  console.log("Setor encontrado:", setor); // Verifique o resultado

  return setor;
}

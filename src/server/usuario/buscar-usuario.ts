"use server";

import { prisma } from "@/lib/prisma";
import { Usuario } from "@prisma/client";

interface IBuscaUsuarioActionRequest {
  pelo: "id" | "email" | "nome";
  valor: string;
}

export default async function prismaBuscaUsuario({
  pelo,
  valor,
}: IBuscaUsuarioActionRequest): Promise<Usuario | null> {
  const usuario = await prisma.usuario.findFirst({
    where: {
      [pelo]: valor,
    },
  });
  console.log("Usuário encontrado:", usuario); // Verifique o resultado

  return usuario;
}

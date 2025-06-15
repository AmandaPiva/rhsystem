"use server";

import prismaBuscaUsuario from "@/server/usuario/buscar-usuario";
import { Usuario } from "@prisma/client";

interface IBuscarUsuarioActionProps {
  userId: string;
}

export default async function configuracaoBuscaUsuarioAction({
  userId,
}: IBuscarUsuarioActionProps): Promise<Usuario | null> {
  const usuario = await prismaBuscaUsuario({ pelo: "id", valor: userId });
  return usuario;
}

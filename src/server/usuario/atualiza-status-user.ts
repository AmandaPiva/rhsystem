import { prisma } from "@/lib/prisma";

export default async function prismaAtualizaStatusUsuario({
  id,
  status,
}: {
  id: string;
  status: boolean;
}) {
  const usuarioAtualizado = await prisma.usuario.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });

  return usuarioAtualizado.id;
}

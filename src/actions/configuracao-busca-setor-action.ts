"use server";

import prismaBuscaSetor from "@/server/setores/buscar-setor";
import { Setor } from "@prisma/client";

interface IBuscarSetorActionProps {
  setorId: string;
}

export default async function configuracaoBuscaSetorAction({
  setorId,
}: IBuscarSetorActionProps): Promise<Setor | null> {
  const setor = await prismaBuscaSetor({ pelo: "id", valor: setorId });
  return setor;
}

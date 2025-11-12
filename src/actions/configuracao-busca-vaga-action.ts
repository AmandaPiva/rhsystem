"use server";

import prismaBuscaVaga from "@/server/vagas/buscar-vaga";
import { Vagas } from "@prisma/client";

interface IBuscarVagaActionProps {
  vagaId: string;
}

export default async function configuracaoBuscaVagaAction({
  vagaId,
}: IBuscarVagaActionProps): Promise<Vagas | null> {
  const vaga = await prismaBuscaVaga({ pelo: "id", valor: vagaId });
  return vaga;
}

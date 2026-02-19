"use server";

import prismaDeleteVaga from "@/server/vagas/delete-vaga";

export default async function configuracaoDeleteVagaAction({
  id,
}: {
  id: string;
}) {
  try {
    const vagaIdDeletada = await prismaDeleteVaga({ id });
    return vagaIdDeletada;
  } catch (error) {
    console.error("Erro ao deletar vaga:", error);
    throw new Error("Erro ao deletar vaga");
  }
}

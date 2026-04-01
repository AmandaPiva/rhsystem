"use server";

import prismaBuscaCandidato from "@/server/candidatos/buscar-candidato";
import { Candidatos } from "@prisma/client";

interface IConigurationCriaCandidatoAction {
  candidatoId: string;
}

export default async function configuracaoBuscaCandidatoAction({
  candidatoId,
}: IConigurationCriaCandidatoAction): Promise<Candidatos | null> {
  const candidato = await prismaBuscaCandidato({
    pelo: "id",
    valor: candidatoId,
  });
  return candidato;
}

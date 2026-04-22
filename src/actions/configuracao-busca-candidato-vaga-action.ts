"use server";

import prismaBuscaCandidatoPelaVaga from "@/server/candidatos/buscar-candidato-pela-vaga";
import { Candidatos } from "@prisma/client";

interface IBuscaCandidatoPelaVagaAction {
  idVaga: string;
}

export default async function configuracaoBuscaCandidatoPelaVagaAction({
  idVaga,
}: IBuscaCandidatoPelaVagaAction): Promise<Candidatos[] | void> {
  const candidatos = await prismaBuscaCandidatoPelaVaga({
    pelo: "idVaga",
    idVaga,
  });
  return candidatos;
}

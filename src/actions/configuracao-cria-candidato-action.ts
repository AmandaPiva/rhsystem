"use server";

import prismaCriaCandidato from "@/server/candidatos/cria-candidato";
import { EtapasProcessoSeletivo } from "@prisma/client";

interface IConfigurationCriaCandidatoAction {
  nome: string;
  cpf: string;
  rg: string;
  email: string;
  celular: string;
  dataNascimento: Date;
  etapa: EtapasProcessoSeletivo;
  enderecoId: string;
  vagaId?: string;
}

export default async function configuracaoCriaCandidatoAction({
  nome,
  cpf,
  rg,
  email,
  celular,
  dataNascimento,
  etapa,
  enderecoId,
  vagaId,
}: IConfigurationCriaCandidatoAction) {
  const candidatoId = await prismaCriaCandidato({
    nome,
    cpf,
    rg,
    email,
    celular,
    dataNascimento,
    etapa,
    enderecoId,
    vagaId,
  });

  return candidatoId;
}

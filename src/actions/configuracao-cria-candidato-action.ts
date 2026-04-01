"use server";

import prismaCriaCandidato from "@/server/candidatos/cria-candidato";

interface IConfigurationCriaCandidatoAction {
  nome: string;
  cpf: string;
  rg: string;
  email: string;
  celular: string;
  dataNascimento: Date;
  enderecoId: string;
}

export default async function configuracaoCriaCandidatoAction({
  nome,
  cpf,
  rg,
  email,
  celular,
  dataNascimento,
  enderecoId,
}: IConfigurationCriaCandidatoAction) {
  const candidatoId = await prismaCriaCandidato({
    nome,
    cpf,
    rg,
    email,
    celular,
    dataNascimento,
    enderecoId,
  });

  return candidatoId;
}

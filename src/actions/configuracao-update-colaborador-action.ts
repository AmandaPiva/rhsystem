"use server";

import prismaBuscaColaborador from "@/server/colaboradores/buscar-colaborador";
import prismaAtualizaColaborador from "@/server/colaboradores/update-colaborador";
import { EstadoCivil, TipoUsuario } from "@prisma/client";

interface IConfiguracaoUpdateColaboradorAction {
  id: string;
  nome: string;
  rg: string;
  cpf: string;
  email: string;
  status: boolean;
  celular: string;
  dataNascimento: Date;
  estadoCivil: EstadoCivil;
  tipo: TipoUsuario;
  setorId: string;
}

export default async function configuracaoUpdateColaboradorAction({
  id,
  nome,
  rg,
  cpf,
  email,
  status,
  celular,
  dataNascimento,
  estadoCivil,
  tipo,
  setorId,
}: IConfiguracaoUpdateColaboradorAction) {
  const colaboradorExistente = await prismaBuscaColaborador({
    pelo: "id",
    valor: id,
  });

  if (!colaboradorExistente) {
    throw new Error("Colaborador não encontrado");
  }

  const colaboradorAtualizado = await prismaAtualizaColaborador({
    id: colaboradorExistente.id,
    nome,
    rg,
    cpf,
    email,
    status,
    celular,
    dataNascimento,
    estadoCivil,
    tipo,
    setorId: setorId,
  });

  return colaboradorAtualizado;
}

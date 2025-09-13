"use server";

import prismaCriaColaborador from "@/server/colaboradores/cria-colaborador";
import { EstadoCivil, Setor, TipoUsuario } from "@prisma/client";

interface IConigurationCriaColaboradorAction {
  nome: string;
  cpf: string;
  rg: string;
  email: string;
  celular: string;
  status: boolean;
  dataNascimento: Date;
  estadoCivil: EstadoCivil;
  tipo: TipoUsuario;
  setorId: string;
}

export default async function configuracaoCriaColaboradorAction({
  nome,
  cpf,
  rg,
  email,
  celular,
  status,
  dataNascimento,
  estadoCivil,
  tipo,
  setorId,
}: IConigurationCriaColaboradorAction) {
  const colaboradorId = await prismaCriaColaborador({
    nome,
    cpf,
    rg,
    email,
    celular,
    status,
    dataNascimento,
    estadoCivil,
    tipo,
    setorId,
  });

  return colaboradorId;
}

"use server";

import { prisma } from "@/lib/prisma";
import { EstadoCivil, Setor, TipoUsuario } from "@prisma/client";

export default async function prismaCriaColaborador({
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
}: {
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
}) {
  const colaborador = await prisma.funcionario.create({
    data: {
      nome,
      cpf,
      rg,
      email,
      celular,
      status,
      dataNascimento,
      estadoCivil,
      tipo,
      setor: {
        //relacionamento com a entidade setor
        connect: { id: setorId },
      },
    },
  });

  return colaborador.id;
}

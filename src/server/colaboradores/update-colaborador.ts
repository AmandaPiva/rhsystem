import { prisma } from "@/lib/prisma";
import { EstadoCivil, TipoUsuario } from "@prisma/client";

export default async function prismaAtualizaColaborador({
  id,
  nome,
  cpf,
  rg,
  email,
  status,
  celular,
  dataNascimento,
  estadoCivil,
  tipo,
  setorId,
}: {
  id: string;
  nome: string;
  cpf: string;
  rg: string;
  email: string;
  status: boolean;
  celular: string;
  dataNascimento: Date;
  estadoCivil: EstadoCivil;
  tipo: TipoUsuario;
  setorId: string;
}) {
  const colaboradorAtualizado = await prisma.funcionario.update({
    where: {
      id,
    },
    data: {
      nome,
      cpf,
      rg,
      email,
      status,
      celular,
      dataNascimento,
      estadoCivil,
      tipo,
      setorId,
    },
  });

  return colaboradorAtualizado.id;
}

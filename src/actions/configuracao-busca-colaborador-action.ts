"use server";
import prismaBuscaColaborador from "@/server/colaboradores/buscar-colaborador";
import { Funcionario } from "@prisma/client";

interface IConfiguracaoBuscaColaboradorAction {
  colaboradorId: string;
}

export default async function configuracaoBuscaColaboradorAction({
  colaboradorId,
}: IConfiguracaoBuscaColaboradorAction): Promise<Funcionario | null> {
  const colaborador = await prismaBuscaColaborador({
    pelo: "id",
    valor: colaboradorId,
  });
  return colaborador;
}

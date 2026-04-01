"use server";

import prismaBuscaEndereco from "@/server/endereco/busca-endereco";
import prismaAtualizaEndereco from "@/server/endereco/update-endereco";

interface IConfiguracaoUpdateEnderecoAction {
  id: string;
  rua: string;
  numero: number;
  bairro: string;
  cidade: string;
  estado: string;
  cep: number;
}

export default async function configuracaoUpdateEnderecoAction({
  id,
  rua,
  numero,
  bairro,
  cidade,
  estado,
  cep,
}: IConfiguracaoUpdateEnderecoAction) {
  const enderecoExistente = await prismaBuscaEndereco({
    pelo: "id",
    valor: id,
  });

  if (!enderecoExistente) {
    throw new Error("Endereço não encontrado");
  }

  const enderecoAtualizado = await prismaAtualizaEndereco({
    id: enderecoExistente.id,
    rua,
    numero,
    bairro,
    cidade,
    estado,
    cep,
  });

  return enderecoAtualizado;
}

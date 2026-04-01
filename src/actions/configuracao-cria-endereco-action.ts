"use server";

import prismaCriaEndereco from "@/server/endereco/cria-endereco";

interface IConfiguracaoCriaEnderecoAction {
  rua: string;
  numero: number;
  bairro: string;
  cidade: string;
  estado: string;
  cep: number;
}

export default async function configuracaoCriaEnderecoAction({
  rua,
  numero,
  bairro,
  cidade,
  estado,
  cep,
}: IConfiguracaoCriaEnderecoAction) {
  const enderecoId = await prismaCriaEndereco({
    rua,
    numero,
    bairro,
    cidade,
    estado,
    cep,
  });

  return enderecoId;
}

import { prisma } from "@/lib/prisma";

export default async function prismaAtualizaEndereco({
  id,
  rua,
  numero,
  bairro,
  cidade,
  estado,
  cep,
}: {
  id: string;
  rua: string;
  numero: number;
  bairro: string;
  cidade: string;
  estado: string;
  cep: number;
}) {
  const endereco = await prisma.endereco.update({
    where: { id },
    data: {
      rua,
      numero,
      bairro,
      cidade,
      estado,
      cep,
    },
  });
  return endereco.id;
}

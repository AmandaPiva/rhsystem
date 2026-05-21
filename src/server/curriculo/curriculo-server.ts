import { prisma } from "@/lib/prisma";

interface SalvarCurriculoProps {
  nome: string;
  url: string;
  candidatoId: string;
}

export async function salvarCurriculo({
  nome,
  url,
  candidatoId,
}: SalvarCurriculoProps) {
  return await prisma.curriculo.create({
    data: {
      nome,
      url,
      candidato: {
        connect: {
          id: candidatoId,
        },
      },
    },
  });
}

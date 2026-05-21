"use server";

import { uploadCurriculo } from "@/lib/uploadCurriculo";
import { salvarCurriculo } from "@/server/curriculo/curriculo-server";

interface IConfigurationCriaCurriculoAction {
  file: File;
  candidatoId: string;
}

export default async function configuracaoCriaCurriculoAction({
  file,
  candidatoId,
}: IConfigurationCriaCurriculoAction) {
  try {
    if (!file) {
      throw new Error("Nenhum arquivo selecionado.");
    }

    // validacao do tipo do arquivo
    if (!file.type.includes("pdf")) {
      throw new Error("O arquivo deve ser um PDF.");
    }

    const result: any = await uploadCurriculo(file);

    const curriculo = await salvarCurriculo({
      nome: file.name,
      url: result.secure_url,
      candidatoId,
    });

    return {
      success: true,
      message: "Currículo criado com sucesso!",
      curriculo,
    };
  } catch (error) {
    console.error("Erro ao criarcurrículo:", error);
    return {
      success: false,
      message: "Erro ao criar currículo.",
    };
  }
}

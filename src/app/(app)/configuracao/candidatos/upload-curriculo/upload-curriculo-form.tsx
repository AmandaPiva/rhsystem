"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Paperclip, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import configuracaoCriaCurriculoAction from "@/actions/configuracao-cria-curriculo-action";

export default function UploadCurriculoForm() {
  const searchParams = useSearchParams();

  const candidatoId = searchParams.get("candidatoId") ?? "";

  const [arquivo, setArquivo] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleUpload() {
    try {
      if (!arquivo) {
        alert("Selecione um currículo");
        return;
      }

      if (!candidatoId) {
        alert("Candidato não encontrado");
        return;
      }

      setLoading(true);

      const response = await configuracaoCriaCurriculoAction({
        file: arquivo,
        candidatoId,
      });
      console.log(response);
      if (!response.success) {
        alert(response.message);
        return;
      }

      alert("Currículo enviado com sucesso!");
      router.push(`/configuracao/candidatos/boas-vindas`);

      setArquivo(null);
    } catch (error) {
      console.error(error);

      alert("Erro ao enviar currículo");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <h1 className="text-3xl font-bold text-center text-indigo-900">
        Faça upload do seu currículo
      </h1>

      <p className="text-center text-gray-500 mt-3">
        Selecione seu currículo em PDF para análise das suas habilidades e
        experiências.
      </p>

      <div className="mt-10 border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center gap-5 bg-gray-50">
        <Paperclip size={40} className="text-indigo-600" />

        <input
          type="file"
          accept=".pdf"
          className="hidden"
          id="curriculo"
          onChange={(e) => {
            const file = e.target.files?.[0];

            if (!file) return;

            setArquivo(file);
          }}
        />

        <label htmlFor="curriculo">
          <Button
            type="button"
            variant="outline"
            className="cursor-pointer"
            asChild
          >
            <span>Selecionar currículo</span>
          </Button>
        </label>

        {arquivo && (
          <div className="text-sm text-gray-600">
            Arquivo selecionado:
            <span className="font-semibold ml-1">{arquivo.name}</span>
          </div>
        )}

        <Button
          onClick={handleUpload}
          disabled={!arquivo || loading}
          className="cursor-pointer w-full"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin mr-2" />
              Enviando...
            </>
          ) : (
            <>
              <Paperclip className="mr-2" />
              Enviar currículo
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

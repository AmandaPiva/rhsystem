"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import prismaBuscaCandidato from "@/server/candidatos/buscar-candidato";
import configuracaoMudaEtapaCandidatoAction from "@/actions/configuracao-muda-etapa-candidato-action";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const etapas = [
  { value: "TRIAGEM", label: "Triagem" },
  { value: "ENTREVISTA", label: "Entrevista" },
  { value: "TESTES", label: "Testes" },
  { value: "AVALIACAO", label: "Avaliação" },
  { value: "CONTRATACAO", label: "Contratação" },
] as const;

export default function InformacoesCandidatos() {
  const [candidato, setCandidato] = useState<{
    id: string;
    nome: string | null;
    cpf: string | null;
    rg: string | null;
    celular: string | null;
    email: string | null;
    dataNascimento: Date | null;
    status: boolean | null;
    etapa: string | null;
    curriculo: Array<{
      id: string;
      nome: string;
      url: string;
      createdAt: Date;
    }> | null;
  }>();
  const [selectedEtapa, setSelectedEtapa] = useState<string>("");
  const [loadingEtapa, setLoadingEtapa] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const candidatoId = searchParams.get("candidatoId") ?? undefined;
  const curriculo = candidato?.curriculo?.[0];

  useEffect(() => {
    async function fetchCandidatos() {
      const candidato: any = await prismaBuscaCandidato({
        pelo: "id",
        valor: candidatoId ?? "",
      });
      setCandidato(candidato);
      setSelectedEtapa(candidato?.etapa ?? "");
    }

    fetchCandidatos();
  }, [candidatoId]);

  async function handleChangeEtapa(value: string) {
    setMessage(null);
    setError(null);
    setSelectedEtapa(value);

    if (!candidato) {
      return;
    }

    setLoadingEtapa(true);
    try {
      const updatedCandidato = await configuracaoMudaEtapaCandidatoAction({
        id: candidato.id,
        etapa: value as any,
      });
      setCandidato((prev) =>
        prev
          ? {
              ...prev,
              ...updatedCandidato,
              curriculo: prev.curriculo ?? null,
            }
          : undefined,
      );
      setMessage("Etapa atualizada com sucesso.");
    } catch (err) {
      setError("Não foi possível atualizar a etapa. Tente novamente.");
      setSelectedEtapa(candidato.etapa ?? "");
    } finally {
      setLoadingEtapa(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
          Informações do Candidato
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm text-gray-500">Nome</label>
            <Input
              readOnly
              value={candidato?.nome ?? ""}
              className="mt-1 bg-gray-100 border-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">CPF</label>
            <Input
              readOnly
              value={candidato?.cpf ?? ""}
              className="mt-1 bg-gray-100 border-none"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">RG</label>
            <Input
              readOnly
              value={candidato?.rg ?? ""}
              className="mt-1 bg-gray-100 border-none"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">Celular</label>
            <Input
              readOnly
              value={candidato?.celular ?? ""}
              className="mt-1 bg-gray-100 border-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm text-gray-500">Email</label>
            <Input
              readOnly
              value={candidato?.email ?? ""}
              className="mt-1 bg-gray-100 border-none"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">Data de Nascimento</label>
            <Input
              readOnly
              value={
                candidato?.dataNascimento
                  ? new Date(candidato.dataNascimento).toLocaleDateString()
                  : ""
              }
              className="mt-1 bg-gray-100 border-none"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">Status</label>
            <Input
              readOnly
              value={candidato?.status ? "Ativo" : "Inativo"}
              className={`mt-1 border-none font-medium ${
                candidato?.status
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm text-gray-500">Etapa</label>
            <Select
              value={selectedEtapa}
              onValueChange={handleChangeEtapa}
              disabled={!candidato || loadingEtapa}
            >
              <SelectTrigger className="w-full mt-1">
                <SelectValue placeholder="Selecione a etapa" />
              </SelectTrigger>
              <SelectContent>
                {etapas.map((etapa) => (
                  <SelectItem key={etapa.value} value={etapa.value}>
                    {etapa.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-2 rounded-lg border border-gray-200 bg-gray-50 p-4">
            <label className="text-sm text-gray-500">Currículo</label>
            {curriculo?.url ? (
              <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-sm text-gray-700">
                  {curriculo.nome || "Currículo anexado"}
                </span>
                <a
                  href={curriculo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  download={curriculo.nome || "curriculo.pdf"}
                  className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
                >
                  Baixar currículo
                </a>
              </div>
            ) : (
              <p className="mt-2 text-sm text-gray-500">
                Nenhum currículo anexado para este candidato.
              </p>
            )}
          </div>
        </div>

        {(message || error) && (
          <div className="mt-4 rounded-md px-4 py-3 text-sm">
            {message ? (
              <div className="text-green-700 bg-green-100">{message}</div>
            ) : (
              <div className="text-red-700 bg-red-100">{error}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

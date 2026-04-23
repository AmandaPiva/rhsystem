"use client";

import { Input } from "@/components/ui/input";
import prismaBuscaCandidato from "@/server/candidatos/buscar-candidato";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

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
  }>();

  const searchParams = useSearchParams();
  const candidatoId = searchParams.get("candidatoId") ?? undefined;

  useEffect(() => {
    async function fetchCandidatos() {
      const candidato: any = await prismaBuscaCandidato({
        pelo: "id",
        valor: candidatoId ?? "",
      });
      setCandidato(candidato);
    }

    fetchCandidatos();
  }, [candidatoId]);

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
            <Input
              readOnly
              value={candidato?.etapa ?? ""}
              className="mt-1 bg-gray-100 border-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

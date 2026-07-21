"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prismaBuscaCandidatoPelaVaga from "@/server/candidatos/buscar-candidato-pela-vaga";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const etapas = [
  { value: "TRIAGEM", label: "Triagem" },
  { value: "ENTREVISTA", label: "Entrevista" },
  { value: "TESTES", label: "Testes" },
  { value: "AVALIACAO", label: "Avaliação" },
  { value: "CONTRATACAO", label: "Contratação" },
] as const;

export default function ListarCandidatosVaga() {
  const [candidatos, setCandidatos] = useState<
    {
      id: string;
      nome: string | null;
      email: string;
      celular: string | null;
      dataNascimento: Date | null;
      etapa: string | null;
    }[]
  >([]);

  const [selectedEtapa, setSelectedEtapa] = useState<string>("");

  const searchParams = useSearchParams();
  const vagaId = searchParams.get("vagaId") ?? undefined;

  useEffect(() => {
    async function fetchCandidatos() {
      const candidatos: any[] = await prismaBuscaCandidatoPelaVaga({
        pelo: "idVaga",
        idVaga: vagaId ?? "",
      });
      setCandidatos(candidatos);
    }

    if (vagaId) {
      fetchCandidatos();
    }
  }, [vagaId]);

  const filteredCandidatos = selectedEtapa
    ? candidatos.filter((candidato) => candidato.etapa === selectedEtapa)
    : candidatos;

  return (
    <div className="mx-auto">
      <h1 className="text-2xl font-bold text-center text-indigo-900 mt-10">
        Candidatos para a vaga
      </h1>

      <div className="flex flex-row mt-10 w-[90%] mx-auto">
        <Select
          value={selectedEtapa}
          onValueChange={(value) => setSelectedEtapa(value ?? "")}
        >
          <SelectTrigger className="w-[300px]">
            <SelectValue placeholder="Filtrar por etapa" />
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

      <div className="mt-5 flex flex-col items-center justify-center">
        {selectedEtapa && filteredCandidatos.length === 0 ? (
          <div className="w-[90%] mx-auto bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center text-gray-700">
            Nenhum candidato encontrado nesta etapa.
          </div>
        ) : candidatos.length === 0 ? (
          <div className="w-[90%] mx-auto bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center text-gray-700">
            Nenhum candidato cadastrado para esta vaga.
          </div>
        ) : (
          <Table className="w-[90%] mx-auto bg-violet-100 rounded-lg">
            <TableHeader className="bg-violet-200 text-white rounded-lg">
              <TableRow>
                <TableHead className="font-bold">Nome</TableHead>
                <TableHead className="font-bold">Email</TableHead>
                <TableHead className="font-bold">Telefone</TableHead>
                <TableHead className="font-bold">Data de Nascimento</TableHead>
                <TableHead className="font-bold">
                  Etapa processo seletivo
                </TableHead>
                <TableHead className="font-bold"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCandidatos.map((candidato) => (
                <TableRow key={candidato.id}>
                  <TableCell>{candidato.nome}</TableCell>
                  <TableCell>{candidato.email}</TableCell>
                  <TableCell>{candidato.celular}</TableCell>
                  <TableCell>
                    {candidato.dataNascimento
                      ? new Date(candidato.dataNascimento).toLocaleDateString()
                      : "N/A"}
                  </TableCell>
                  <TableCell>{candidato.etapa ?? "N/A"}</TableCell>
                  <TableCell>
                    <Button className="cursor-pointer bg-black text-white hover:bg-indigo-900">
                      <Link
                        href={`/configuracao/candidatos/infos-candidatos?candidatoId=${candidato.id}`}
                      >
                        Ver Detalhes
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}

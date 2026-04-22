"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prismaBuscaCandidatoPelaVaga from "@/server/candidatos/buscar-candidato-pela-vaga";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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

    fetchCandidatos();
  }, []);

  return (
    <div className="mx-auto">
      <h1 className="text-2xl font-bold text-center text-indigo-900 mt-10">
        Candidatos para a vaga
      </h1>

      <div className=" mt-5 flex flex-col items-center justify-center mt-10">
        <Table className="w-[90%] mx-auto bg-violet-100 rounded-lg">
          <TableHeader className="bg-violet-200 text-white rounded-lg">
            <TableRow>
              <TableHead className=" font-bold">Nome</TableHead>
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
            {candidatos.map((candidato) => (
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
                  <Button className="cursor-pointer bg-black text-white hover:bg-indigo-900 ">
                    Ver Detalhes
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

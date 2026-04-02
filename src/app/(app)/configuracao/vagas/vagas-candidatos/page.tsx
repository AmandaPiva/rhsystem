"use client";

import NextLink from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { buscarVagasStatusAberta } from "@/server/vagas/buscar-vaga-status-aberta";
import { StatusVaga } from "@prisma/client";
import { Label } from "@radix-ui/react-label";
import { useEffect, useState } from "react";

export default function VagasCandidatos() {
  const [vagasAbertas, setVagasAbertas] = useState<
    {
      id: string;
      nome: string | null;
      descricao: string | null;
      status: StatusVaga | null;
      setor: {
        id: string;
        nome: string | null;
      } | null;
      dataCriacao: Date | null;
    }[]
  >([]);

  useEffect(() => {
    async function fetchVagasAbertas() {
      const vagas = await buscarVagasStatusAberta();
      setVagasAbertas(vagas);
    }
    fetchVagasAbertas();
  }, []);
  return (
    <div className="mx-auto">
      <h1 className="text-2xl font-bold text-center text-indigo-900 mt-10">
        Cadastre-se para as vagas disponíveis
      </h1>

      <div className="flex flex-row gap-4 mt-10 w-[90%] mx-auto">
        {vagasAbertas.map((vaga) => (
          <Card className="w-full max-w-sm">
            <CardHeader>
              <>
                <CardTitle key={vaga.id}>{vaga.nome}</CardTitle>
                <CardDescription>Descrição: {vaga.descricao}</CardDescription>
                <Label className="mt-4" htmlFor="title">
                  Data de abertura: {vaga.dataCriacao?.toLocaleDateString()}
                </Label>
                <Label htmlFor="title">Setor: {vaga.setor?.nome}</Label>

                <Dialog>
                  <DialogTrigger>
                    <div className="flex items-center mt-4">
                      <Button className="cursor-pointer bg-black text-white hover:bg-indigo-900 ml-auto">
                        Detalhes
                      </Button>
                      <NextLink
                        href={`/configuracao/candidatos/cadastro-candidato?vagaId=${vaga.id}`}
                        className="ml-4"
                      >
                        <Button className="cursor-pointer bg-indigo-900 text-white">
                          Candidatar-se
                        </Button>
                      </NextLink>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>{vaga.nome}</DialogTitle>
                      <DialogDescription>
                        Setor: {vaga.setor?.nome}
                      </DialogDescription>
                      <DialogDescription>
                        Descrição: {vaga.descricao}
                      </DialogDescription>
                      <DialogDescription>
                        Data de abertura:{" "}
                        {vaga.dataCriacao?.toLocaleDateString()}
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}

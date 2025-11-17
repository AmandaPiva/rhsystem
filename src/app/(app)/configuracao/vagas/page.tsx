"use client";

import configuracaoMudaStatusVagaAction from "@/actions/configuracao-muda-status-vaga-action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { listaVagas } from "@/server/vagas/lista-vagas";
import { StatusVaga } from "@prisma/client";
import { Dialog } from "@radix-ui/react-dialog";
import { SelectTrigger } from "@radix-ui/react-select";
import { Plus, Trash } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Vagas() {
  const [vagas, setVagas] = useState<
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
    async function fetchVagas() {
      const vagas = await listaVagas();
      setVagas(vagas);
    }
    fetchVagas();
  }, []);

  async function handleStatusChange(vagaId: string, novoStatus: StatusVaga) {
    try {
      const statusVagaModificado = await configuracaoMudaStatusVagaAction({
        id: vagaId,
        status: novoStatus,
      });
      setVagas((prev) =>
        prev.map((v) =>
          v.id === vagaId
            ? { ...v, status: statusVagaModificado?.status ?? novoStatus }
            : v
        )
      );
    } catch (error) {
      console.error("Erro ao alterar status da vaga:", error);
    }
  }

  return (
    <div className="mx-auto">
      <h1 className="text-2xl font-bold text-center text-indigo-900 mt-10">
        Configuração de Vagas
      </h1>
      <p className="text-center text-gray-500">Gerencie os vagas da empresa</p>

      <div className="w-[90%] flex flex-row gap-2 mt-10 mx-auto">
        <Button className="cursor-pointer bg-black text-white hover:bg-indigo-900 ml-auto">
          <Link href="/configuracao/vagas/criar-vaga">
            <div className="flex items-center gap-2">
              <Plus />
              Nova vaga
            </div>
          </Link>
        </Button>
      </div>

      <div className="flex flex-row gap-4 mt-10 w-[90%] mx-auto">
        {vagas.map((vaga) => (
          <Card className="w-full max-w-sm">
            <CardHeader>
              <>
                <CardTitle key={vaga.id}>{vaga.nome}</CardTitle>
                <CardDescription>Descrição: {vaga.descricao}</CardDescription>
                <Label className="mt-4" htmlFor="title">
                  Data de abertura: {vaga.dataCriacao?.toLocaleDateString()}
                </Label>
                <Label htmlFor="title">Setor: {vaga.setor?.nome}</Label>
                <div className="flex flex-row gap-4">
                  <Badge className="mt-4 bg-emerald-500">{vaga.status}</Badge>
                  <div className="ml-auto"></div>
                  <Dialog>
                    <DialogTrigger>
                      <Button className="cursor-pointer bg-black text-white hover:bg-indigo-900 ">
                        Detalhes
                      </Button>
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
                        <DialogDescription>
                          <Badge className="mt-4 bg-emerald-500">
                            {vaga.status}
                          </Badge>
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="mt-6 flex flex-row gap-4">
                        <Select
                          value={String(vaga.status ?? "ABERTA")}
                          onValueChange={(value) =>
                            handleStatusChange(vaga.id, value as StatusVaga)
                          }
                        >
                          <SelectTrigger className="w-50">
                            <SelectValue placeholder="Mudar status da Vaga" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ABERTA">ABERTA</SelectItem>
                            <SelectItem value="FECHADA">FECHADA</SelectItem>
                            <SelectItem value="PREENCHIDA">
                              PREENCHIDA
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <Button className="cursor-pointer bg-black text-white hover:bg-indigo-900 ">
                          Ver Candidatos
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Button className="cursor-pointer bg-red-500 text-white hover:bg-indigo-900 ">
                    <Trash />
                  </Button>
                </div>
              </>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}

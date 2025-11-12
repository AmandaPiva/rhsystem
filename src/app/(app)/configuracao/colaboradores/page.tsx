"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
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
import { listaColaboradores } from "@/server/colaboradores/lista-colaboradores";
import { EstadoCivil, TipoUsuario } from "@prisma/client";
import { Pencil, Plus, Trash } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Colaboradores() {
  const [colaboradores, setColaboradores] = useState<
    {
      id: string;
      nome: string | null;
      rg: string | null;
      email: string | null;
      status: boolean | null;
      dataNascimento: Date | null;
      estadoCivil: EstadoCivil | null;
      tipo: TipoUsuario | null;
      setor: {
        id: string;
        nome: string | null;
      } | null;
    }[]
  >([]);

  useEffect(() => {
    async function fetchColaboradores() {
      const colaboradores = await listaColaboradores();
      setColaboradores(colaboradores);
    }

    fetchColaboradores();
  }, []);

  return (
    <div className="mx-auto">
      <h1 className="text-2xl font-bold text-center text-indigo-900 mt-10">
        Configuração de Colaboradores
      </h1>
      <p className="text-center text-gray-500">
        Gerencie os colaboradores da empresa
      </p>

      <div className="flex flex-row mt-20 w-[90%] mx-auto">
        <Select>
          <SelectTrigger className="w-[300px]">
            <SelectValue placeholder="Filtrar por Setor" />
          </SelectTrigger>
          <SelectContent></SelectContent>
        </Select>

        <div className="ml-auto flex flex-row gap-2">
          <Button className="cursor-pointer bg-black text-white hover:bg-indigo-900 ml-auto">
            <Link href="/configuracao/colaboradores/criar-colaborador">
              <div className="flex items-center gap-2">
                <Plus />
                Novo Colaborador
              </div>
            </Link>
          </Button>
        </div>
      </div>

      <div className=" mt-5 flex flex-col items-center justify-center">
        <Table className="w-[90%] mx-auto bg-violet-100 rounded-lg">
          <TableHeader>
            <TableRow>
              <TableHead className=" font-bold">Nome</TableHead>
              <TableHead className="font-bold">E-mail</TableHead>
              <TableHead className="font-bold">Setor</TableHead>
              <TableHead className="font-bold">Status</TableHead>
              <TableHead className="font-bold">Tipo</TableHead>
              <TableHead className="font-black">Editar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {colaboradores.map((colaborador) => (
              <TableRow key={colaborador.id}>
                <TableCell>{colaborador.nome}</TableCell>
                <TableCell>{colaborador.email}</TableCell>
                <TableCell>{colaborador.setor?.nome}</TableCell>
                <TableCell>
                  {colaborador.status ? "Ativo" : "Inativo"}
                </TableCell>
                <TableCell>{colaborador.tipo}</TableCell>
                <TableCell>
                  <Link
                    href={`/configuracao/colaboradores/update-colaborador/${colaborador.id}`}
                    className="cursor-pointer"
                  >
                    <Pencil />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { listaSetores } from "@/server/setores/lista-setores";
import { Pencil, Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Setores() {
  const [setores, setSetores] = useState<
    {
      id: string;
      nome: string | null;
      descricao: string | null;
    }[]
  >([]);

  useEffect(() => {
    async function fetchSetores() {
      const setores = await listaSetores();
      setSetores(setores);
    }

    fetchSetores();
  }, []);

  return (
    <div className="mx-auto">
      <h1 className="text-2xl font-bold text-center text-indigo-900 mt-10">
        Configuração de Setores
      </h1>
      <p className="text-center text-gray-500">
        Gerencie os setores do sistema
      </p>

      <div className=" mt-5 flex flex-col items-center justify-center">
        <div className="w-[30%] flex flex-row gap-2 mt-10">
          <Button className="cursor-pointer bg-black text-white hover:bg-indigo-900 ml-auto">
            <Link href="/configuracao/setores/criar-setor">
              <div className="flex items-center gap-2">
                <Plus />
                Novo Setor
              </div>
            </Link>
          </Button>
        </div>

        <Table className="w-[30%] mx-auto bg-violet-100 rounded-lg mt-5">
          <TableHeader className="bg-violet-200 text-white rounded-lg">
            <TableRow>
              <TableHead className="font-bold">Nome</TableHead>
              <TableHead className="font-bold">Descrição</TableHead>
              <TableHead className="font-black">Editar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {setores.map((setor) => (
              <TableRow key={setor.id}>
                <TableCell className="font-medium">{setor.nome}</TableCell>
                <TableCell>{setor.descricao}</TableCell>
                <TableCell>
                  <Link href={`#`} className="cursor-pointer">
                    <Pencil />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* <div className="mt-10 mx-auto max-w-md">
        <Input placeholder="Pesquisar setor..." />
      </div> */}
    </div>
  );
}

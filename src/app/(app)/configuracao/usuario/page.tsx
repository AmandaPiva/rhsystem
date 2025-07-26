"use client";

import configuracaoMudaStatusUsuarioAction from "@/actions/configuracao-muda-status-usuario-action";
import StatusSwitch from "@/components/StatusSwitch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { listaUsuarios } from "@/server/usuario/lista-usuarios";
import { Pencil, Plus, Trash } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState<
    {
      id: string;
      nome: string | null;
      email: string;
      status: boolean;
      tipo: string;
    }[]
  >([]);

  useEffect(() => {
    async function fetchUsuarios() {
      const usuarios = await listaUsuarios();
      setUsuarios(usuarios);
    }

    fetchUsuarios();
  }, []);

  return (
    <div className="mx-auto">
      <h1 className="text-2xl font-bold text-center text-indigo-900 mt-10">
        Configuração de Usuários
      </h1>
      <p className="text-center text-gray-500">
        Gerencie os usuarios do sistema
      </p>

      <div className="ml-[80%] flex flex-row gap-2 mt-10">
        <Button className="cursor-pointer bg-black text-white rounded-4xl hover:bg-indigo-900 h-10 w-10">
          <Link href="/configuracao/usuario/criar-usuario">
            <Plus />
          </Link>
        </Button>
      </div>
      <div className=" mt-5 flex flex-col items-center justify-center">
        <Table className="w-[90%] mx-auto bg-violet-100 rounded-lg">
          <TableHeader className="bg-violet-200 text-white rounded-lg">
            <TableRow>
              <TableHead className=" font-bold">Nome</TableHead>
              <TableHead className="font-bold">Email</TableHead>
              <TableHead className="font-bold">Status</TableHead>
              <TableHead className="font-bold">Tipo de Usuário</TableHead>
              <TableHead className="font-bold">Ações</TableHead>
              <TableHead className="font-bold">Editar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usuarios.map(
              (usuario) => (
                console.log(usuario.tipo),
                (
                  <TableRow key={usuario.id}>
                    <TableCell className="font-medium">
                      {usuario.nome}
                    </TableCell>
                    <TableCell>{usuario.email}</TableCell>
                    <TableCell>
                      <StatusSwitch
                        userId={usuario.id}
                        initialStatus={usuario.status}
                      />
                    </TableCell>
                    <TableCell>
                      {usuario.tipo === "ADMIN" ? "Admin" : "Usuário"}
                    </TableCell>

                    <TableCell>
                      <Button className="cursor-pointer">Detalhes</Button>
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/configuracao/usuario/update-usuario/${usuario.id}`}
                        className="cursor-pointer"
                      >
                        <Pencil />
                      </Link>
                    </TableCell>
                  </TableRow>
                )
              )
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

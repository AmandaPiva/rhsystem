import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { listaUsuarios } from "@/server/usuario/lista-usuarios";
import { TipoUsuario } from "@prisma/client";
import { Pencil, Plus, Trash } from "lucide-react";

export default async function Usuarios() {
    const usuarios = await listaUsuarios();

    return (
        <div className="mx-auto">
            <h1 className="text-2xl font-bold text-center text-indigo-900 mt-10">Configuração de Usuários</h1>
            <p className="text-center text-gray-500">Gerencie os usuarios do sistema</p>
           
           <div className="ml-[80%] flex flex-row gap-2 mt-10">
                <Button className="cursor-pointer bg-black text-white rounded-4xl hover:bg-indigo-900 h-10 w-10">
                    <Plus />
                </Button>
                <Button className="cursor-pointer bg-indigo-900 text-white rounded-4xl hover:bg-indigo-900 h-10 w-10">
                    <Pencil />
                </Button>
                <Button className="cursor-pointer bg-red-700 text-white rounded-4xl hover:bg-indigo-900 h-10 w-10">
                    <Trash />
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
                        </TableRow>
                    </TableHeader>
                <TableBody>
                    {usuarios.map((usuario) => (
                        console.log(usuario.tipo),
                        <TableRow key={usuario.id}>
                            <TableCell className="font-medium">{usuario.nome}</TableCell>
                            <TableCell>{usuario.email}</TableCell>
                            <TableCell>{usuario.status ? "Ativo" : "Inativo"}</TableCell>
                            <TableCell>{usuario.tipo === "ADMIN" ? "Admin" : "Usuário"}</TableCell>
                            <TableCell><Button className="cursor-pointer">Detalhes</Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </div>

        </div>
    )
}
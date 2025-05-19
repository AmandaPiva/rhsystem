import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Plus, Trash } from "lucide-react";

export default function Colaboradores(){
    return (
         <div className="mx-auto">
            <h1 className="text-2xl font-bold text-center text-indigo-900 mt-10">Configuração de Colaboradores</h1>
            <p className="text-center text-gray-500">Gerencie os colaboradores da empresa</p>
           
           <div className="flex flex-row mt-20 w-[90%] mx-auto">
                <Select>
                    <SelectTrigger className="w-[300px]">
                        <SelectValue placeholder="Filtrar por Setor" />
                    </SelectTrigger>
                    <SelectContent>
                        
                    </SelectContent>
                </Select>
                <div className="ml-auto flex flex-row gap-2">
                    <Button className="bg-black text-white rounded-4xl hover:bg-indigo-900 h-10 w-10">
                        <Plus />
                    </Button>
                    <Button className="bg-indigo-900 text-white rounded-4xl hover:bg-indigo-900 h-10 w-10">
                        <Pencil />
                    </Button>
                    <Button className="bg-red-700 text-white rounded-4xl hover:bg-indigo-900 h-10 w-10">
                        <Trash />
                    </Button>
                </div>
           </div>

            <div className=" mt-5 flex flex-col items-center justify-center">
            <Table className="w-[90%] mx-auto bg-violet-100 rounded-lg">
                    <TableHeader>
                        <TableRow>
                        <TableHead className="w-[100px] font-bold">Nome</TableHead>
                        <TableHead className="font-bold">Celular</TableHead>
                        <TableHead className="font-bold">E-mail</TableHead>
                        <TableHead className="font-bold">Setor</TableHead>
                        <TableHead className="font-bold">Status</TableHead>
                        <TableHead className="font-bold">Tipo</TableHead>
                        </TableRow>
                    </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">INV001</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                         <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            </div>

        </div>
    )
}
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Plus, Trash } from "lucide-react";

export default function Usuarios() {
    return (
        <div className="mx-auto">
            <h1 className="text-2xl font-bold text-center text-indigo-900 mt-10">Configuração de Usuários</h1>
            <p className="text-center text-gray-500">Gerencie os usuarios do sistema</p>
           
           <div className="ml-[80%] flex flex-row gap-2 mt-10">
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
            <div className=" mt-5 flex flex-col items-center justify-center">
            <Table className="w-[90%] mx-auto bg-violet-100 rounded-lg">
                    <TableHeader>
                        <TableRow>
                        <TableHead className="w-[100px] font-bold">Nome</TableHead>
                        <TableHead className="font-bold">Email</TableHead>
                        <TableHead className="font-bold">Permissão</TableHead>
                        <TableHead className="font-bold">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">INV001</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            </div>

        </div>
    )
}
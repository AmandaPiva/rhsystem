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

export default function Setores() {
  return (
    <div className="mx-auto">
      <h1 className="text-2xl font-bold text-center text-indigo-900 mt-10">
        Configuração de Setores
      </h1>
      <p className="text-center text-gray-500">
        Gerencie os setores do sistema
      </p>

      <div className="ml-[90%] flex flex-row gap-2 mt-10">
        <Button className="cursor-pointer bg-black text-white hover:bg-indigo-900">
          Novo Setor
        </Button>
      </div>

      <div className=" mt-5 flex flex-col items-center justify-center">
        <Table className="w-[90%] mx-auto bg-violet-100 rounded-lg">
          <TableHeader className="bg-violet-200 text-white rounded-lg">
            <TableRow>
              <TableHead className=" font-bold">Nome</TableHead>
              <TableHead className="font-bold">Descrição</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody></TableBody>
        </Table>
      </div>

      {/* <div className="mt-10 mx-auto max-w-md">
        <Input placeholder="Pesquisar setor..." />
      </div> */}
    </div>
  );
}

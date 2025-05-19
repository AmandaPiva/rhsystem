import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CriaColaboradoresForm(){
    return (
         <>
        <div className="aling-center flex flex-col items-center justify-center mt-10">
            <h1 className="text-2xl font-bold text-indigo-900">Cadastro de Colaboradores</h1>
            <Input className="w-[80%] mt-5" type="text" placeholder="Nome do Colaborador" />
            <Input className="w-[80%] mt-5" type="email" placeholder="E-mail" />
            <Input className="w-[80%] mt-5" type="text" placeholder="CPF" />
            <Input className="w-[80%] mt-5" type="text" placeholder="RG" />
            <Input className="w-[80%] mt-5" type="date" placeholder="Data de Nascimento" />

            
            <div className=" flex flex-row mt-10">
                <Select>
                    <SelectTrigger className="w-[300px]">
                        <SelectValue placeholder="Setor" />
                    </SelectTrigger>
                    <SelectContent>
                        
                    </SelectContent>
                </Select>
                <Button className="ml-5 bg-gray-800">Cadastrar</Button>
            </div>
        </div>
        </>
    )
}
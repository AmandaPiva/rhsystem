import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CriaUsuarioForm(){
    return(
        <>
        <div className="aling-center flex flex-col items-center justify-center mt-10">
            <h1 className="text-2xl font-bold text-indigo-900">Cadastre os usuários do sistema</h1>
            <Input className="w-[80%] mt-5" type="text" placeholder="Nome do Usuário" />
            <Input className="w-[80%] mt-5" type="email" placeholder="E-mail" />
            <Input className="w-[80%] mt-5" type="password" placeholder="Senha" />
            <Input className="w-[80%] mt-5" type="password" placeholder="Confirmação de Senha" />
            
            
            <div className=" flex flex-row mt-10">
                <Select>
                    <SelectTrigger className="w-[300px]">
                        <SelectValue placeholder="Tipo de Usuário" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">ADMIN</SelectItem>
                        <SelectItem value="dark">COMUM</SelectItem>
                    </SelectContent>
                </Select>

                <Select >
                    <SelectTrigger className="w-[300px] ml-5">
                        <SelectValue placeholder="É funcionário?" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Sim</SelectItem>
                        <SelectItem value="dark">Não</SelectItem>
                    </SelectContent>
                </Select>
                <Button className="ml-5 bg-gray-800">Cadastrar</Button>
            </div>
            

        </div>
        
        </>
    )
}
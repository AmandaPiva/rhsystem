import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Setores() {
    return (
        <>
            <div className="p-10">
                <h1 className="text-2xl font-bold text-indigo-900">Cadastre os setores da empresa</h1>
                <Input className="w-70 mt-5" type="text" placeholder="Nome do Setor" />
                <Button className="bg-gray-800 mt-5">Adicionar</Button>
            </div>
        </>
    )
}
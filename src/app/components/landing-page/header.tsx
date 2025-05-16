import { Button } from "@/components/ui/button";

export default function Header() {
    return (
        <header className="bg-violet-800 h-20 flex flex-row ">
            <div className="container mx-auto flex items-center justify-between h-full px-4">
                <h1 className="text-2xl font-bold text-white flex justify-center">RH System</h1>
            </div>
            <div className="mx-auto flex items-center justify-between h-full px-4 space-x-4">
                <Button>Configurações</Button>
                <Button >Vagas</Button>
                <Button >Colaboradores</Button>
            </div>
            
        </header>
    );
}
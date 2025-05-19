import { Button } from "@/components/ui/button";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";

export default function Header() {
    return (
        <header className="bg-indigo-800 h-20 flex flex-row ">
            <div className="container mx-auto flex items-center justify-between h-full px-4">
                <h1 className="text-2xl font-bold text-white flex justify-center">RH System</h1>
            </div>
            <div className="mx-auto flex items-center justify-between h-full px-4 space-x-4">
               <Menubar className="bg-gray-900 text-white border-gray-900">
                    <MenubarMenu >
                        <MenubarTrigger className="bg-gray-900 data-[state=open]:bg-gray-900 aria-expanded:bg-gray-900 text-white">Configurações</MenubarTrigger>
                        <MenubarContent>
                       
                        <MenubarItem>Usuários</MenubarItem>
                        <MenubarItem>Setores</MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                </Menubar>
                
                
                <Button >Vagas</Button>
                <Button >Colaboradores</Button>
            </div>
        </header>
    );
}
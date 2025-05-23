"use client";

import { useParams } from "next/navigation";
import UpdateUsuarioForm from "../update-usuario-form";

export default function ConfiguracaoUpdateUsuario() {
    const {userId} = useParams();

    if(!userId){
        return <div>Usuário não encontrado</div>
    }   
    return (
        <div className="w-full flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">Atualizar Usuário</h1>
            <UpdateUsuarioForm userId={userId} />
        </div>
    );

}s
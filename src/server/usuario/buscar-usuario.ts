"use service";

import { prisma } from "@/lib/prisma";
import { Usuario } from "@prisma/client";

interface IBuscaUsuarioActionRequest {
    pelo: "email" | "nome" | "id";
    valor: string;
}

export default async function prismaBuscaUsuario({
    pelo,
    valor,
}: IBuscaUsuarioActionRequest): Promise<Usuario | null> {
    const usuario = await prisma.usuario.findFirst({
        where: {
            [pelo]: valor,
        },
    });

    return usuario;

}
"use server";

import { prisma } from "@/lib/prisma";
import { TipoUsuario } from "@prisma/client";

export async function listaUsuarios(){
    return prisma.usuario.findMany({
        select: {
            id: true,
            nome: true,
            email: true,
            status: true,
            tipo: true,
        },
        
        orderBy: {
            nome: "asc",
        },
    });
}
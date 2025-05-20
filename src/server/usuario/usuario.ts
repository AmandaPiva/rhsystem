"use server";

import { prisma } from "@/lib/prisma";
import { TipoUsuario } from "@prisma/client";

export default async function prismaCriaUsuario({
    nome,
    email,
    senha,
    status,
    tipo,
}: {
    nome: string;
    email: string;
    senha: string;
    status: boolean;
    tipo: TipoUsuario;
}) {
    const usuario = await prisma.usuario.create({
        data: {
            nome,
            email,
            senha,
            status,
            tipo,
        },
    });
    return usuario.id;
}
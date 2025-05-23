import { prisma } from "@/lib/prisma";
import { TipoUsuario } from "@prisma/client";

export default async function prismaAtualizaUsuario({
    id,
    nome,
    email,
    status,
    tipoUsuario,
}: {
    id: string;
    nome: string;
    email: string;
    status: boolean;
    tipoUsuario: string;
}) {
    const usuarioAtualizado = await prisma.usuario.update({
        where: {
            id,
        },
        data: {
            nome,
            email,
            status,
            tipo: tipoUsuario as TipoUsuario,
        },
    });

    return usuarioAtualizado.id;
}
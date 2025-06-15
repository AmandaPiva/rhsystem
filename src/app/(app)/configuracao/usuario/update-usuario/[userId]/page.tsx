"use client";

import { useParams } from "next/navigation";
import UpdateUsuarioForm from "../update-usuario-form";

export default function ConfiguracaoUpdateUsuario() {
  const params = useParams();
  const userId = params?.userId as string;

  if (!userId) {
    return <div>Usuário não encontrado</div>;
  }
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <UpdateUsuarioForm userId={userId} />
    </div>
  );
}

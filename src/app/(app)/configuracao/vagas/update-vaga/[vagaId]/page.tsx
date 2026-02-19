"use client";

import { useParams } from "next/navigation";
import UpdateVagaForm from "../update-vaga-form";

export default function ConfiguracaoUpdateVaga() {
  const params = useParams();
  const vagaId = params?.vagaId as string;

  if (!vagaId) {
    return <div>Vaga não encontrada</div>;
  }

  return <UpdateVagaForm vagaId={vagaId} />;
}

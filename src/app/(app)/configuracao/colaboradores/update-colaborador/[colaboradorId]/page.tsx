"use client";

import { useParams } from "next/navigation";
import UpdateColaboradorForm from "../update-colaborador-form";

export default function ConfiguracaoUpdateColaborador() {
  const params = useParams();
  const colaboradorId = params?.colaboradorId as string;

  if (!colaboradorId) {
    return <div>Colaborador não encontrado</div>;
  }
  return (
    <div>
      <UpdateColaboradorForm colaboradorId={colaboradorId} />
    </div>
  );
}

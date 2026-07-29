"use client";
import { useParams } from "next/navigation";
import CriarFeriasForm from "./criar-ferias-form";

export default function AdicionarFerias() {
  const params = useParams();
  const colaboradorId = params?.colaboradorId as string;

  if (!colaboradorId) {
    return <div>Colaborador não encontrado</div>;
  }

  return <CriarFeriasForm colaboradorId={colaboradorId} />;
}

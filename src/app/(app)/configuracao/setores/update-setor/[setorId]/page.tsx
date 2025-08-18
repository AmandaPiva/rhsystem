"use client";

import { useParams } from "next/navigation";
import UpdateSetorForm from "../update-setor-form";

export default function ConfiguracaoUpdateSetor() {
  const params = useParams();
  const setorId = params?.setorId as string;

  if (!setorId) {
    return <div>Setor não encontrado</div>;
  }

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <UpdateSetorForm setorId={setorId} />
    </div>
  );
}

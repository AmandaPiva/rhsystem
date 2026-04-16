"use client";

import { Button } from "@/components/ui/button";
import { Paperclip } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function UploadCurriculoForm() {
  const searchParams = useSearchParams();
  const candidatoId = searchParams.get("candidatoId") ?? undefined;

  return (
    <div className="mx-auto">
      <h1 className="text-2xl font-bold text-center text-indigo-900 mt-10">
        Faça upload do seu currículo
      </h1>
      <p className="text-center text-gray-600 mt-4">
        Selecione o arquivo do seu currículo para que possamos analisar suas
        habilidades e experiências.
      </p>
      <div className="flex justify-center mx-auto w-[30%] mt-10">
        <Button className="cursor-pointer">
          <Paperclip />
          Upload
        </Button>
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";

export default function BoasVindasCandidatoProcessoSeletivo() {
  return (
    <div className="aling-center flex flex-col items-center justify-center mt-10">
      <h1 className="text-2xl font-bold text-indigo-900">
        Bem-vindo ao processo seletivo!
      </h1>
      <p className="text-lg text-center text-gray-500 mt-4">
        Estamos felizes em tê-lo conosco. Agradecemos por se candidatar e
        estamos ansiosos para conhecer mais sobre você.
      </p>

      <div className="flex justify-center mx-auto w-[30%] mt-8">
        <Button className="cursor-pointer">
          Detalhes do processo seletivo
        </Button>
      </div>
    </div>
  );
}

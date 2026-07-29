"use client";

import configuracaoBuscaColaboradorAction from "@/actions/configuracao-busca-colaborador-action";
import configuracaoCriaFeriasAction from "@/actions/configuracao-cria-ferias-action";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import prismaBuscaColaborador from "@/server/colaboradores/buscar-colaborador";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  dataInicio: z
    .string()
    .min(1, {
      message: "Data de início é obrigatória.",
    })
    .datetime({ message: "Data de início inválida." }),
  dataFim: z
    .string()
    .min(1, {
      message: "Data de fim é obrigatória.",
    })
    .datetime({ message: "Data de fim inválida." }),
  status: z.boolean(),
  colaboradorId: z.string().min(1, {
    message: "Colaborador é obrigatório.",
  }),
});

type FormData = z.infer<typeof formSchema>;

export default function CriarFeriasForm({
  colaboradorId,
}: {
  colaboradorId: string;
}) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [colaboradorName, setColaboradorName] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchColaboradorName = async () => {
      try {
        const response = await configuracaoBuscaColaboradorAction({
          colaboradorId,
        });

        if (response) {
          setColaboradorName(response.nome);
        } else {
          setColaboradorName(null);
        }
      } catch (error) {
        console.error("Erro ao buscar o nome do colaborador:", error);
      }
    };
    fetchColaboradorName();
  }, [colaboradorId]);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError(null);

    try {
      const feriasId = await configuracaoCriaFeriasAction({
        dataInicio: data.dataInicio,
        dataFim: data.dataFim,
        status: data.status,
        colaboradorId: colaboradorId || "",
      });

      if (feriasId) {
        router.push(`/configuracao/ferias/adicionar-ferias/${colaboradorId}`);
      }
    } catch (error) {
      setError("Erro ao criar férias.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="aling-center flex flex-col items-center justify-center mt-10">
      <h1 className="text-2xl font-bold text-indigo-900">Adicione as férias</h1>
      <p className="text-gray-500 mt-4">
        Preencha os campos abaixo para adionar as férias do colaborador{" "}
        <b>{colaboradorName || "desconhecido"}</b>.
      </p>
      <Form {...form}>
        {error && (
          <Alert variant="destructive" className="mt-4 w-[400px]">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erro ao criar candidato</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form
          className="mt-8 flex flex-col w-[90%]"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Label>Data de início</Label>
          <FormField
            control={form.control}
            name="dataInicio"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="mt-2 w-[300px] items-center justify-center"
                    type="date"
                    placeholder="Data de Início"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Label className="mt-6">Data fim</Label>
          <FormField
            control={form.control}
            name="dataFim"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="mt-2 w-[300px] items-center justify-center"
                    type="date"
                    placeholder="Data Fim"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-6 w-[50%]">
            <Button type="submit" className="bg-gray-800 cursor-pointer">
              Adicionar Férias
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

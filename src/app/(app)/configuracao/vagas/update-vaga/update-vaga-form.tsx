"use client";

import configuracaoBuscaVagaAction from "@/actions/configuracao-busca-vaga-action";
import configuracaoUpdateVagaAction from "@/actions/configuracao-update-vaga-action";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  nome: z.string().min(1, { message: "Nome é obrigatório" }),
  descricao: z.string().min(1, { message: "Descrição é obrigatória" }),
  setor: z.string().min(1, { message: "Setor é obrigatório" }),
});
type FormData = z.infer<typeof formSchema>;

export default function UpdateVagaForm({ vagaId }: { vagaId: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    async function fetchVaga() {
      try {
        const vaga = await configuracaoBuscaVagaAction({ vagaId });
        if (vaga) {
          form.reset({
            nome: vaga.nome ?? "",
            descricao: vaga.descricao ?? "",
            setor: vaga.setorId ?? "",
          });
        } else {
          setError("Vaga não encontrada");
        }
      } catch (error) {
        setError("Erro ao buscar vaga");
      }
    }
    if (vagaId) {
      fetchVaga();
    }
  }, [vagaId, form]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);

    const { nome, descricao, setor } = data;

    try {
      await configuracaoUpdateVagaAction({
        id: vagaId,
        nome,
        descricao,
        setorId: setor,
        dataFinalizacao: null,
      });
      router.push("/configuracao/vagas");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Erro ao atualizar vaga");
      }
    }
    setLoading(false);
  };

  return (
    <div className="aling-center flex flex-col items-center justify-center mt-10">
      <h1 className="text-2xl font-bold text-indigo-900">
        Atualização da vaga
      </h1>

      <Form {...form}>
        {error && (
          <Alert variant="destructive" className="mt-4 w-[400px]">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erro ao atualizar vaga</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-8 flex flex-col w-[90%]"
        >
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="w-[100%] mt-5"
                    type="text"
                    {...field}
                    placeholder="Nome da vaga"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="descricao"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    className="w-[100%] mt-5"
                    {...field}
                    placeholder="Descrição"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center mx-auto w-[30%]">
            <Button
              type="submit"
              disabled={loading}
              className="mx-auto mt-8 bg-gray-800 cursor-pointer w-[70%]"
            >
              {loading ? "Atualizando..." : "Atualizar Vaga"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

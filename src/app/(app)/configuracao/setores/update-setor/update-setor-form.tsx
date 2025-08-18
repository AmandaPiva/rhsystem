"use client";

import configuracaoBuscaSetorAction from "@/actions/configuracao-busca-setor-action";
import configuracaoUpdateSetorAction from "@/actions/configuracao-update-setor-action";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  nome: z.string().min(1, { message: "Nome é obrigatório" }),
  descricao: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function UpdateSetorForm({ setorId }: { setorId: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    async function fetchSetor() {
      try {
        const setor = await configuracaoBuscaSetorAction({ setorId });
        if (setor) {
          form.reset({
            nome: setor.nome ?? "",
            descricao: setor.descricao ?? "",
          });
        } else {
          setError("Setor não encontrado");
        }
      } catch (error) {
        setError("Erro ao buscar setor");
      }
    }
    if (setorId) {
      fetchSetor();
    }
  }, [setorId, form]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);

    const { nome, descricao } = data;

    try {
      await configuracaoUpdateSetorAction({
        id: setorId,
        nome,
        descricao: descricao ?? "",
      });
      console.log("Setor atualizado com sucesso");
      router.push("/configuracao/setores");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Erro desconhecido");
      }
    }
    setLoading(false);
  };

  return (
    <div className="aling-center flex flex-col items-center justify-center mt-10">
      <h1 className="text-2xl font-bold text-indigo-900">
        Atualize os setores
      </h1>

      <Form {...form}>
        {error && (
          <Alert variant="destructive" className="mt-4 w-[400px]">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erro ao atualizar usuário</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex flex-col items-center justify-center">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 flex flex-col w-[160%]"
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
                      placeholder="Nome do Setor"
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
                    <Input
                      className="w-[100%] mt-5"
                      type="text"
                      {...field}
                      placeholder="Descrição"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="mx-auto mt-8 bg-gray-800 cursor-pointer w-[70%]"
            >
              Atualizar
            </Button>
          </form>
        </div>
      </Form>
    </div>
  );
}

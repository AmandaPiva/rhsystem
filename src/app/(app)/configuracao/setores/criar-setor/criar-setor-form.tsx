"use client";

import configuracaoCriaSetorAction from "@/actions/configuracao-cria-setor-action";
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
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  nome: z.string().min(1, { message: "Nome é obrigatório" }),
  descricao: z.string().min(1, { message: "Descrição é obrigatória" }),
});
type FormData = z.infer<typeof formSchema>;

export default function CriarSetorForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError(null);

    try {
      const setorId = await configuracaoCriaSetorAction({
        nome: data.nome,
        descricao: data.descricao,
      });

      if (setorId) {
        router.push("/configuracao/setores");
      }
    } catch (err) {
      setError("Erro ao criar setor. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="aling-center flex flex-col items-center justify-center mt-10">
        <h1 className="text-2xl font-bold text-indigo-900">
          Cadastre os Setores
        </h1>
        <p className="text-gray-500">
          Preencha os campos abaixo para criar um novo setor
        </p>
        <Form {...form}>
          {error && (
            <Alert variant="destructive" className="mt-4 w-[400px]">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Erro ao criar setor</AlertTitle>
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

              <div className=" flex flex-row mt-10 justify-center">
                <Button
                  type="submit"
                  className="ml-5 bg-gray-800 cursor-pointer"
                >
                  Cadastrar
                </Button>
              </div>
            </form>
          </div>
        </Form>
      </div>
    </>
  );
}

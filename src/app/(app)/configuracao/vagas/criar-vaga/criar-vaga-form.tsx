"use client";

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
import { listaSetores } from "@/server/setores/lista-setores";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  nome: z.string().min(1, { message: "Nome é obrigatório" }),
  descricao: z.string().min(1, { message: "Descrição é obrigatória" }),
  setor: z.string().min(1, { message: "Setor é obrigatório" }),
});
type FormData = z.infer<typeof formSchema>;

export default function CriarVagaForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [setores, setSetores] = useState<
    { id: string; nome: string | null; descricao: string | null }[]
  >([]);

  useEffect(() => {
    async function fetchSetores() {
      const setores = await listaSetores();
      setSetores(setores);
    }

    fetchSetores();
  }, []);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  return (
    <div className="aling-center flex flex-col items-center justify-center mt-10">
      <h1 className="text-2xl font-bold text-indigo-900">Cadastro da vaga</h1>
      <p className="text-gray-500">
        Preencha os campos abaixo para criar uma nova vaga
      </p>

      <Form {...form}>
        {error && (
          <Alert variant="destructive" className="mt-4 w-[400px]">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erro ao criar setor</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form
          //onSubmit={form.handleSubmit(onSubmit)}
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
          <FormField
            control={form.control}
            name="setor"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-50 mt-5">
                    <SelectValue placeholder="Setor da vaga" />
                  </SelectTrigger>
                  <SelectContent>
                    {setores.map((setor) => (
                      <SelectItem key={setor.id} value={setor.id}>
                        {setor.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
              {loading ? "Criando..." : "Criar Vaga"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

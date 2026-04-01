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
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  nome: z.string().min(1, "O nome é obrigatório"),
  cpf: z
    .string()
    .min(1, { message: "CPF é obrigatório" })
    .max(16, { message: "CPF deve ter no máximo 16 caracteres" }),
  rg: z.string().min(1, { message: "RG é obrigatório" }).max(12, {
    message: "RG deve ter no máximo 8 caracteres",
  }),
  celular: z.string().min(1, "O celular é obrigatório"),
  email: z.string().email("Email inválido").min(1, "O email é obrigatório"),
  dataNascimento: z.string().min(1, "A data de nascimento é obrigatória"),
});
type FormData = z.infer<typeof formSchema>;

export default function CriarCandidatoForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  return (
    <div className="aling-center flex flex-col items-center justify-center mt-10">
      <h1 className="text-2xl font-bold text-indigo-900">Candidatos</h1>
      <p className="text-gray-500">
        Preencha os campos abaixo para se cadastrar como candidato.
      </p>

      <Form {...form}>
        {error && (
          <Alert variant="destructive" className="mt-4 w-[400px]">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erro ao criar candidato</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form className="mt-8 flex flex-col w-[90%]">
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="mt-6"
                    placeholder="Nome do Candidato"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-11">
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className="mt-6" placeholder="CPF" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rg"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className="mt-6" placeholder="RG" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="celular"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="mt-6 w-[400px]"
                    placeholder="Celular"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input className="mt-6" placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dataNascimento"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="mt-6 w-[400px]"
                    type="date"
                    placeholder="Data de Nascimento"
                    {...field}
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
              {loading ? "Loading..." : "Próxima etapa"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

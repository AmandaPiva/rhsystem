"use client";

import configuracaoCriaCandidatoAction from "@/actions/configuracao-cria-candidato-action";
import configuracaoCriaEnderecoAction from "@/actions/configuracao-cria-endereco-action";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { EtapasProcessoSeletivo } from "@prisma/client";
import { AlertCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
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
  rua: z.string().optional(),
  numero: z.number().optional(),
  bairro: z.string().optional(),
  cidade: z.string().optional(),
  estado: z.string().optional(),
  cep: z.number().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function CriarCandidatoForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const vagaId = searchParams.get("vagaId") ?? undefined;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError(null);
    try {
      let enderecoId: string | undefined;

      if (
        data.rua &&
        data.numero &&
        data.bairro &&
        data.cidade &&
        data.estado &&
        data.cep
      ) {
        enderecoId = await configuracaoCriaEnderecoAction({
          rua: data.rua,
          numero: data.numero,
          bairro: data.bairro,
          cidade: data.cidade,
          estado: data.estado,
          cep: data.cep,
        });
      }

      const candidatoId = await configuracaoCriaCandidatoAction({
        nome: data.nome,
        cpf: data.cpf,
        rg: data.rg,
        celular: data.celular,
        email: data.email,
        dataNascimento: new Date(data.dataNascimento),
        etapa: EtapasProcessoSeletivo.TRIAGEM,
        enderecoId: enderecoId || "",
        vagaId,
      });

      if (candidatoId) {
        console.log("Candidato criado com ID:", candidatoId);
        router.push(
          `/configuracao/candidatos/upload-curriculo?candidatoId=${candidatoId}`,
        );
      }
    } catch (err) {
      setError("Erro ao criar candidato. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };
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

        <form
          className="mt-8 flex flex-col w-[90%]"
          onSubmit={form.handleSubmit(onSubmit)}
        >
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

          <h1 className="text-lg font-semibold mt-10 text-gray-700">
            Endereço
          </h1>

          <>
            <FormField
              control={form.control}
              name="rua"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="mt-6 "
                      placeholder="Rua"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="numero"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="mt-6 w-[200px]"
                      type="number"
                      placeholder="Número"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value) || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className=" flex gap-11">
              <FormField
                control={form.control}
                name="bairro"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="mt-6 w-[200px]"
                        placeholder="Bairro"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cidade"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="mt-6 w-[200px]"
                        placeholder="Cidade"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="estado"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="mt-6 w-[200px]"
                      placeholder="Estado (UF)"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cep"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="mt-6 w-[200px]"
                      type="number"
                      placeholder="CEP"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value) || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>

          <div className="flex justify-center mx-auto w-[30%] mb-6">
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

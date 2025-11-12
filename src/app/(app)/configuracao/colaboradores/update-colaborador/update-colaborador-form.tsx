"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useState } from "react";
import { AlertCircle, ChevronDownIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EstadoCivil, TipoUsuario } from "@prisma/client";
import configuracaoUpdateColaboradorAction from "@/actions/configuracao-update-colaborador-action";
import configuracaoBuscaColaboradorAction from "@/actions/configuracao-busca-colaborador-action";
import { useRouter } from "next/navigation";
import { listaSetores } from "@/server/setores/lista-setores";

const formSchema = z.object({
  nome: z.string().min(1).optional(),
  email: z.string().email().optional(),
  cpf: z.string().min(1).max(16).optional(),
  rg: z.string().min(1).max(16).optional(),
  dataNascimento: z.date().optional(),
  estadoCivil: z.nativeEnum(EstadoCivil).optional(),
  tipo: z.nativeEnum(TipoUsuario).optional(),
  status: z.boolean().optional(),
  celular: z.string().min(1).max(16).optional(),
  setor: z.string().min(1).optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function UpdateColaboradorForm({
  colaboradorId,
}: {
  colaboradorId: string;
}) {
  const [setores, setSetores] = useState<
    { id: string; nome: string | null; descricao: string | null }[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    async function fetchSetores() {
      const setores = await listaSetores();
      setSetores(setores);
    }

    fetchSetores();
  }, []);

  useEffect(() => {
    async function fetchColaborador() {
      try {
        const colaborador = await configuracaoBuscaColaboradorAction({
          colaboradorId,
        });

        if (colaborador) {
          form.reset({
            nome: colaborador.nome ?? "",
            email: colaborador.email ?? "",
            cpf: colaborador.cpf ?? "",
            rg: colaborador.rg ?? "",
            dataNascimento: colaborador.dataNascimento ?? undefined,
            estadoCivil: colaborador.estadoCivil ?? undefined,
            tipo: colaborador.tipo ?? undefined,
            status: colaborador.status ?? undefined,
            celular: colaborador.celular ?? "",
            setor: colaborador.setorId ?? "",
          });
        } else {
          setError("Colaborador não encontrado");
        }
      } catch (error) {
        setError("Erro ao buscar colaborador");
      }
    }
    if (colaboradorId) {
      fetchColaborador();
    }
  }, [colaboradorId, form]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);

    const {
      nome,
      email,
      cpf,
      rg,
      dataNascimento,
      estadoCivil,
      tipo,
      status,
      celular,
      setor,
    } = data;

    try {
      await configuracaoUpdateColaboradorAction({
        id: colaboradorId,
        nome: nome || "",
        email: email || "",
        cpf: cpf || "",
        rg: rg || "",
        dataNascimento: dataNascimento ?? new Date(),
        estadoCivil: estadoCivil ?? EstadoCivil.SOLTEIRO,
        tipo: tipo as TipoUsuario,
        status: status || false,
        celular: celular || "",
        setorId: setor || "",
      });
      console.log("Colaborador atualizado com sucesso");
      router.push("/configuracao/colaboradores");
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
        Atualize o colaborador
      </h1>

      <Form {...form}>
        {error && (
          <Alert variant="destructive" className="mt-4 w-[400px]">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erro ao atualizar colaborador</AlertTitle>
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
                    className="mt-3"
                    placeholder="Nome do Colaborador"
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
                  <Input
                    className="mt-6"
                    type="email"
                    placeholder="E-mail"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 mt-6 w-[30%]">
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className="w-50" placeholder="CPF" {...field} />
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
                    <Input className="w-50" placeholder="RG" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="dataNascimento"
            render={({ field }) => (
              <FormItem className="mt-6">
                <Label htmlFor="date" className="px-1">
                  Data de Nascimento
                </Label>
                <FormControl>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="date"
                        className="w-48 justify-between font-normal"
                      >
                        {field.value
                          ? field.value.toLocaleDateString()
                          : "Select date"}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                          field.onChange(date);
                          setOpen(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 mt-3 w-[30%]">
            <FormField
              control={form.control}
              name="estadoCivil"
              render={({ field }) => (
                <FormItem>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex gap-4"
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="SOLTEIRO" id="solteiro" />
                      <Label htmlFor="solteiro">Solteiro</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="CASADO" id="casado" />
                      <Label htmlFor="casado">Casado</Label>
                    </div>
                  </RadioGroup>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <RadioGroup
                    onValueChange={(value) => field.onChange(value === "true")}
                    value={field.value ? "true" : "false"}
                    className="flex gap-4"
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="true" id="true" />
                      <Label htmlFor="ativo">Ativo</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="false" id="false" />
                      <Label htmlFor="inativo">Inativo</Label>
                    </div>
                  </RadioGroup>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="celular"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Celular" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 mt-6 w-[30%]">
            <FormField
              control={form.control}
              name="setor"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-50">
                      <SelectValue placeholder="Selecione o setor" />
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

            <FormField
              control={form.control}
              name="tipo"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-50">
                      <SelectValue placeholder="Tipo de Usuário" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                      <SelectItem value="USUARIO">Usuário</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-center mx-auto w-[30%]">
            <Button
              type="submit"
              disabled={loading}
              className="mx-auto mt-8 bg-gray-800 cursor-pointer w-[70%]"
            >
              {loading ? "Atualizando..." : "Atualizar"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

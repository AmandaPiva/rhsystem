"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useState } from "react";
import { listaSetores } from "@/server/setores/lista-setores";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import configuracaoCriaColaboradorAction from "@/actions/configuracao-cria-colaborador-action";
import { EstadoCivil, TipoUsuario } from "@prisma/client";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CalendarIcon, ChevronDownIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

const formSchema = z.object({
  nome: z.string().min(1, { message: "Nome é obrigatório" }),
  email: z.string().email({ message: "E-mail inválido" }),
  cpf: z
    .string()
    .min(1, { message: "CPF é obrigatório" })
    .max(16, { message: "CPF deve ter no máximo 16 caracteres" }),
  rg: z.string().min(1, { message: "RG é obrigatório" }).max(12, {
    message: "RG deve ter no máximo 8 caracteres",
  }),
  dataNascimento: z.date({
    required_error: "Data de Nascimento é obrigatória",
  }),
  estadoCivil: z.nativeEnum(EstadoCivil, {
    required_error: "Estado Civil é obrigatório",
    invalid_type_error: "Estado Civil inválido",
  }),
  tipo: z.nativeEnum(TipoUsuario, {
    required_error: "Tipo do usuário é obrigatório",
    invalid_type_error: "Tipo do usuário inválido",
  }),
  status: z.boolean({ message: "Defina os status para o colaborador" }),
  celular: z.string().min(1, { message: "Celular é obrigatório" }),
  setor: z.string({ message: "Adicione este colaborador em um setor" }),
});
type FormData = z.infer<typeof formSchema>;

export default function CriaColaboradoresForm() {
  const [setores, setSetores] = useState<
    { id: string; nome: string | null; descricao: string | null }[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<Date>();
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

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError(null);

    try {
      console.log("cheguei aqui");
      const colaboradorId = await configuracaoCriaColaboradorAction({
        nome: data.nome,
        cpf: data.cpf,
        rg: data.rg,
        email: data.email,
        celular: data.celular,
        status: data.status,
        dataNascimento: data.dataNascimento,
        estadoCivil: data.estadoCivil,
        setorId: data.setor,
        tipo: data.tipo,
      });

      if (colaboradorId) {
        console.log("CRIOU");
        router.push("/configuracao/colaboradores");
      }
    } catch (err) {
      setError("Erro ao criar colaborador. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="aling-center flex flex-col items-center justify-center mt-10">
      <h1 className="text-2xl font-bold text-indigo-900">
        Cadastro de Colaboradores
      </h1>
      <p className="text-gray-500">
        Preencha os campos abaixo para criar um novo colaborador
      </p>

      <Form {...form}>
        {error && (
          <Alert variant="destructive" className="mt-4 w-[400px]">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erro ao criar colaborador</AlertTitle>
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
              {loading ? "Cadastrando..." : "Cadastrar"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

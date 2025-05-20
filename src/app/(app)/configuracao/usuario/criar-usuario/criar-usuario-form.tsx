"use client";

import configuracaoCriaUsuarioAction from "@/actions/configuracao-cria-usuario-action";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TipoUsuario } from "@prisma/client";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"; 
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

const formSchema = z
    .object({
        nome: z.string().min(1, { message: "Nome é obrigatório" }),
        email: z.string().email({ message: "Email inválido" }),
        senha: z.string().min(6, { message: "Senha deve ter pelo menos 6 caracteres" }),
        confirmacaoSenha: z.string().min(6, { message: "Confirmação de senha deve ter pelo menos 6 caracteres" }),
        tipoUsuario: z.enum(["ADMIN", "COMUM"], {
            errorMap: () => ({ message: "Tipo de usuário é obrigatório" }),
        }),
        funcionario: z.enum(["sim", "nao"], {
            errorMap: () => ({ message: "Selecione se é funcionário" }),
        }),
})


type FormData = z.infer<typeof formSchema>;

export default function CriaUsuarioForm(){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
    })
    
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setLoading(true);
        
        const { nome, email, senha, confirmacaoSenha } = data;
        const tipoUser: TipoUsuario = data.tipoUsuario as TipoUsuario;
        const funcionario = data.funcionario === "sim" ? true : false;

        try {
            await configuracaoCriaUsuarioAction({
                nome,
                email,
                senha,
                confirmacaoSenha,
                status: true,
                tipoUsuario: tipoUser,
                funcionario,
            });
            console.log("Usuário criado com sucesso");

        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Erro desconhecido");
            }
        } 
    }

    return(
        <>
        <div className="aling-center flex flex-col items-center justify-center mt-10">
            <h1 className="text-2xl font-bold text-indigo-900">Cadastre os usuários do sistema</h1>

            <Form {...form}>
                 {error && (
                    <Alert variant="destructive" className="mt-4 w-[400px]">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Erro ao criar usuário</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                <div className="flex flex-col items-center justify-center">
                <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 flex flex-col w-[160%]">
                    <FormField
                        control={form.control}
                        name="nome"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                     <Input className="w-[100%] mt-5" type="text" {...field} placeholder="Nome do Usuário" />
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
                                     <Input className="w-[100%] mt-5" type="email" {...field} placeholder="E-mail" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="senha"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                     <Input className="w-[100%] mt-5" type="password" {...field} placeholder="Senha" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmacaoSenha"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                      <Input className="w-[100%] mt-5" type="password" {...field} placeholder="Confirmação de Senha" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className=" flex flex-row mt-10 justify-center">
                            <FormField
                                control={form.control}
                                name="tipoUsuario"
                                render={({ field }) => (
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        >
                                        <SelectTrigger className="w-[300px]">
                                            <SelectValue placeholder="Tipo de Usuário" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="ADMIN">ADMIN</SelectItem>
                                            <SelectItem value="COMUM">COMUM</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />

                        
                            <FormField
                                control={form.control}
                                name="funcionario"
                                render={({ field }) => (
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    >
                                    <SelectTrigger className="w-[300px] ml-5">
                                        <SelectValue placeholder="É funcionário?" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="sim">Sim</SelectItem>
                                        <SelectItem value="nao">Não</SelectItem>
                                    </SelectContent>
                                </Select>
                                )}
                            />
                            <Button type="submit" className="ml-5 bg-gray-800">Cadastrar</Button>
                        
                    </div>
                
                </form>
                </div>
            </Form>
        </div>
       </>
    )
}



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

export default function CriaColaboradoresForm() {
  const [setores, setSetores] = useState<
    {
      id: string;
      nome: string | null;
      descricao: string | null;
    }[]
  >([]);
  const [cpf, setCpf] = useState("");
  const [rg, setRg] = useState("");
  const [telefone, setTelefone] = useState("");
  useEffect(() => {
    async function fetchSetores() {
      const setores = await listaSetores();
      setSetores(setores);
    }

    fetchSetores();
  }, []);

  function formatCPF(value: string) {
    return value
      .replace(/\D/g, "") // remove tudo que não é número
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }

  function formatRG(value: string) {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1})$/, "$1-$2");
  }
  function formatTelefone(value: string) {
    return value
      .replace(/\D/g, "") // remove não números
      .replace(/^(\d{2})(\d)/, "($1) $2") // adiciona DDD
      .replace(/(\d{5})(\d)/, "$1-$2") // adiciona hífen depois de 5 dígitos
      .replace(/(-\d{4})\d+?$/, "$1"); // limita ao formato (XX) XXXXX-XXXX
  }

  return (
    <>
      <div className="aling-center flex flex-col items-center justify-center mt-10">
        <h1 className="text-2xl font-bold text-indigo-900">
          Cadastro de Colaboradores
        </h1>
        <p className="text-gray-500">
          Preencha os campos abaixo para criar um novo colaborador
        </p>
        <Input
          className="w-[80%] mt-5"
          type="text"
          placeholder="Nome do Colaborador"
        />
        <Input className="w-[80%] mt-5" type="email" placeholder="E-mail" />
        <Input
          className="w-[80%] mt-5"
          type="text"
          placeholder="CPF"
          value={cpf}
          onChange={(e) => setCpf(formatCPF(e.target.value))}
        />
        <Input
          className="w-[80%] mt-5"
          type="text"
          placeholder="RG"
          value={rg}
          onChange={(e) => setRg(formatRG(e.target.value))}
        />
        <Input
          className="w-[80%] mt-5"
          type="date"
          placeholder="Data de Nascimento"
        />

        <div className=" flex flex-row  w-[80%]">
          <div className="flex flex-col mt-5">
            <h2>Estado Civil</h2>
            <RadioGroup defaultValue="option-one">
              <div className="flex items-center gap-3 mt-5">
                <RadioGroupItem value="solteiro" id="r1" />
                <Label htmlFor="r1">Solteiro</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="casado" id="r2" />
                <Label htmlFor="r2">Casado</Label>
              </div>
            </RadioGroup>
          </div>
          <Input
            className="ml-15 mt-5 w-60"
            type="text"
            placeholder="Telefone"
            onChange={(e) => setTelefone(formatTelefone(e.target.value))}
            value={telefone}
          />

          <Select>
            <SelectTrigger className="w-[300px] mt-5 ml-5">
              <SelectValue placeholder="Setor" />
            </SelectTrigger>
            <SelectContent>
              {setores.map((setor) => (
                <SelectItem key={setor.id} value={setor.id}>
                  {setor.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button className="ml-5 mt-5 bg-gray-800">Cadastrar</Button>
        </div>
      </div>
    </>
  );
}

"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import configuracaoMudaStatusColaboradorAction from "@/actions/configuracao-muda-status-colaborador-action";

export default function StatusSwitchColaborador({
  colaboradorId,
  initialStatus,
}: {
  colaboradorId: string;
  initialStatus: boolean;
}) {
  const [status, setStatus] = useState(initialStatus);

  async function handleStatusChange(newStatus: boolean) {
    await configuracaoMudaStatusColaboradorAction({
      id: colaboradorId,
      status: newStatus,
    });

    setStatus(newStatus);
  }

  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor={`status-switch-${colaboradorId}`} className="text-sm">
        {status ? "Ativo" : "Inativo"}
      </Label>
      <Switch
        id={`status-switch-${colaboradorId}`}
        checked={status}
        onCheckedChange={(checked) => {
          handleStatusChange(checked);
        }}
      />
    </div>
  );
}

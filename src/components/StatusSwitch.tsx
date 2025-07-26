"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import configuracaoMudaStatusUsuarioAction from "@/actions/configuracao-muda-status-usuario-action";
import { useState } from "react";

export default function StatusSwitch({
  userId,
  initialStatus,
}: {
  userId: string;
  initialStatus: boolean;
}) {
  const [status, setStatus] = useState(initialStatus);

  async function handleStatusChange(newStatus: boolean) {
    await configuracaoMudaStatusUsuarioAction({
      id: userId,
      status: newStatus,
    });

    setStatus(newStatus);
  }

  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor={`status-switch-${userId}`} className="text-sm">
        {status ? "Ativo" : "Inativo"}
      </Label>
      <Switch
        id={`status-switch-${userId}`}
        checked={status}
        onCheckedChange={(checked) => {
          handleStatusChange(checked);
        }}
      />
    </div>
  );
}

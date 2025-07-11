"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select" // Importar Select

interface ReasonForLossDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  dealId: string
  onSaveReason: (dealId: string, reason: string) => void
}

const lossReasons = ["Cliente achou caro", "Fechou com concorrente", "Desistiu", "Outros"]

export function ReasonForLossDialog({ open, onOpenChange, dealId, onSaveReason }: ReasonForLossDialogProps) {
  const [reason, setReason] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (reason.trim()) {
      onSaveReason(dealId, reason.trim())
      setReason("")
    }
  }

  const handleSelectChange = (value: string) => {
    setReason(value)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Motivo da Perda</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reason">Por favor, informe o motivo da perda desta oportunidade:</Label>
            <Select value={reason} onValueChange={handleSelectChange} required>
              <SelectTrigger id="reason">
                <SelectValue placeholder="Selecione um motivo" />
              </SelectTrigger>
              <SelectContent>
                {lossReasons.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Salvar Motivo</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

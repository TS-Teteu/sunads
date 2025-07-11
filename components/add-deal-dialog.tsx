"use client"

import type React from "react"
import { useState } from "react"
import type { Deal } from "@/components/commercial-page" // Importar Deal do CommercialPage
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AddDealDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddDeal: (deal: Omit<Deal, "id" | "createdAt">) => void
}

export function AddDealDialog({ open, onOpenChange, onAddDeal }: AddDealDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    clientName: "",
    value: 0,
    stage: "qualificacao" as Deal["stage"],
    expectedCloseDate: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.clientName || !formData.value || !formData.expectedCloseDate) {
      return
    }

    onAddDeal(formData)

    // Reset form
    setFormData({
      title: "",
      clientName: "",
      value: 0,
      stage: "qualificacao",
      expectedCloseDate: "",
    })

    onOpenChange(false)
  }

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nova Oportunidade</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título da Oportunidade *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Ex: Projeto de SEO para Cliente X"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="clientName">Nome do Cliente *</Label>
            <Input
              id="clientName"
              value={formData.clientName}
              onChange={(e) => handleChange("clientName", e.target.value)}
              placeholder="Ex: ABC Marketing"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="value">Valor (R$) *</Label>
            <Input
              id="value"
              type="number"
              value={formData.value}
              onChange={(e) => handleChange("value", Number(e.target.value))}
              placeholder="0.00"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="stage">Etapa do Funil</Label>
            <Select value={formData.stage} onValueChange={(value) => handleChange("stage", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="qualificacao">Qualificação</SelectItem>
                <SelectItem value="negociacao">Negociação</SelectItem>
                <SelectItem value="fechado">Fechado</SelectItem> {/* Renomeado */}
                <SelectItem value="perdido">Perdido</SelectItem> {/* Renomeado */}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="expectedCloseDate">Data de Fechamento Esperada *</Label>
            <Input
              id="expectedCloseDate"
              type="date"
              value={formData.expectedCloseDate}
              onChange={(e) => handleChange("expectedCloseDate", e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Criar Oportunidade</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

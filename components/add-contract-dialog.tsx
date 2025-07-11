"use client"

import type React from "react"
import { useState } from "react"
import type { Contract } from "@/components/contracts-view"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AddContractDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddContract: (contract: Omit<Contract, "id" | "createdAt">) => void
}

export function AddContractDialog({ open, onOpenChange, onAddContract }: AddContractDialogProps) {
  const [formData, setFormData] = useState({
    companyName: "",
    responsible: "",
    value: 0,
    startDate: "",
    endDate: "",
    status: "ativo" as Contract["status"],
    attachmentUrl: "", // Campo para URL do anexo
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.companyName || !formData.responsible || !formData.value || !formData.startDate || !formData.endDate) {
      return
    }

    onAddContract(formData)

    // Reset form
    setFormData({
      companyName: "",
      responsible: "",
      value: 0,
      startDate: "",
      endDate: "",
      status: "ativo",
      attachmentUrl: "",
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
          <DialogTitle>Novo Contrato</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="companyName">Nome da Empresa *</Label>
            <Input
              id="companyName"
              value={formData.companyName}
              onChange={(e) => handleChange("companyName", e.target.value)}
              placeholder="Nome da empresa cliente"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="responsible">Responsável *</Label>
            <Input
              id="responsible"
              value={formData.responsible}
              onChange={(e) => handleChange("responsible", e.target.value)}
              placeholder="Nome do responsável pelo contrato"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="value">Valor do Contrato (R$) *</Label>
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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Data de Início *</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleChange("startDate", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">Data de Término *</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => handleChange("endDate", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ativo">Ativo</SelectItem>
                <SelectItem value="expirado">Expirado</SelectItem>
                <SelectItem value="cancelado">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="attachmentUrl">URL do Anexo (PDF, Imagem, etc.)</Label>
            <Input
              id="attachmentUrl"
              value={formData.attachmentUrl}
              onChange={(e) => handleChange("attachmentUrl", e.target.value)}
              placeholder="Ex: https://seusite.com/contrato.pdf"
            />
            <p className="text-xs text-muted-foreground">
              Para anexar um arquivo, você pode fazer upload para um serviço de armazenamento e colar a URL aqui.
            </p>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Adicionar Contrato</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

"use client"

import type React from "react"
import { useState } from "react"
import type { Proposal } from "@/components/proposals-page"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AddProposalDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddProposal: (proposal: Omit<Proposal, "id" | "createdAt">) => void
}

export function AddProposalDialog({ open, onOpenChange, onAddProposal }: AddProposalDialogProps) {
  const [formData, setFormData] = useState({
    companyName: "",
    responsible: "",
    proposalType: "",
    value: 0,
    proposalDate: "",
    category: "A" as Proposal["category"],
    status: "rascunho" as Proposal["status"],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !formData.companyName ||
      !formData.responsible ||
      !formData.proposalType ||
      !formData.value ||
      !formData.proposalDate
    ) {
      return
    }

    onAddProposal(formData)

    // Reset form
    setFormData({
      companyName: "",
      responsible: "",
      proposalType: "",
      value: 0,
      proposalDate: "",
      category: "A",
      status: "rascunho",
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
          <DialogTitle>Nova Proposta</DialogTitle>
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
              placeholder="Nome do responsável pela proposta"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="proposalType">Tipo de Proposta *</Label>
            <Input
              id="proposalType"
              value={formData.proposalType}
              onChange={(e) => handleChange("proposalType", e.target.value)}
              placeholder="Ex: Gestão de Tráfego, Criação de IA"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
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
              <Label htmlFor="proposalDate">Data da Proposta *</Label>
              <Input
                id="proposalDate"
                type="date"
                value={formData.proposalDate}
                onChange={(e) => handleChange("proposalDate", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Categoria</Label>
              <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">Tipo A</SelectItem>
                  <SelectItem value="B">Tipo B</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rascunho">Rascunho</SelectItem>
                  <SelectItem value="enviada">Enviada</SelectItem>
                  <SelectItem value="aprovada">Aprovada</SelectItem>
                  <SelectItem value="rejeitada">Rejeitada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Adicionar Proposta</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

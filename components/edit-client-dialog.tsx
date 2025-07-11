"use client"

import type React from "react"
import { useState, useEffect } from "react"
import type { Client } from "@/components/clients-view"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface EditClientDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  client: Client // Cliente a ser editado
  onUpdateClient: (client: Client) => void // Função para atualizar o cliente
}

export function EditClientDialog({ open, onOpenChange, client, onUpdateClient }: EditClientDialogProps) {
  const [formData, setFormData] = useState<Client>(client)

  // Atualiza o formData quando o cliente prop muda (ex: ao abrir o diálogo para um novo cliente)
  useEffect(() => {
    setFormData(client)
  }, [client])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.companyName || !formData.phone || !formData.email) {
      return
    }

    onUpdateClient(formData)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Cliente</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Nome completo do cliente"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyName">Nome da Empresa *</Label>
            <Input
              id="companyName"
              value={formData.companyName}
              onChange={(e) => handleChange("companyName", e.target.value)}
              placeholder="Nome da empresa do cliente"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefone *</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="(XX) XXXXX-XXXX"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="email@exemplo.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="stage">Etapa</Label>
            <Select value={formData.stage} onValueChange={(value) => handleChange("stage", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a etapa" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kickoff">Kickoff</SelectItem>
                <SelectItem value="ativo">Ativo</SelectItem>
                <SelectItem value="inativo">Inativo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="priorityStatus">Prioridade</Label>
            <Select value={formData.priorityStatus} onValueChange={(value) => handleChange("priorityStatus", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a prioridade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="critica">Crítica</SelectItem>
                <SelectItem value="escalando">Escalando</SelectItem>
                <SelectItem value="testando-criativos">Testando criativos</SelectItem>
                <SelectItem value="ok">Ok</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="groupLink">Link do Grupo (WhatsApp)</Label>
            <Input
              id="groupLink"
              value={formData.groupLink}
              onChange={(e) => handleChange("groupLink", e.target.value)}
              placeholder="Ex: https://chat.whatsapp.com/..."
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Salvar Alterações</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

"use client"

import type React from "react"
import { useState } from "react"
import type { Contact } from "@/components/contacts-view"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AddContactDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddContact: (contact: Omit<Contact, "id" | "createdAt">) => void
}

export function AddContactDialog({ open, onOpenChange, onAddContact }: AddContactDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    phone: "",
    origin: "",
    projectType: "outros" as Contact["projectType"],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.companyName || !formData.phone || !formData.origin) {
      return
    }

    onAddContact(formData)

    // Reset form
    setFormData({
      name: "",
      companyName: "",
      phone: "",
      origin: "",
      projectType: "outros",
    })

    onOpenChange(false)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Novo Contato</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Nome completo do contato"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyName">Nome da Empresa *</Label>
            <Input
              id="companyName"
              value={formData.companyName}
              onChange={(e) => handleChange("companyName", e.target.value)}
              placeholder="Nome da empresa do contato"
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
            <Label htmlFor="origin">Origem *</Label>
            <Input
              id="origin"
              value={formData.origin}
              onChange={(e) => handleChange("origin", e.target.value)}
              placeholder="Ex: Indicação, Website, Evento"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="projectType">Tipo de Projeto</Label>
            <Select value={formData.projectType} onValueChange={(value) => handleChange("projectType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo de projeto" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gestao-trafego">Gestão de Tráfego</SelectItem>
                <SelectItem value="criacao-ia">Criação de IA</SelectItem>
                <SelectItem value="outros">Outros</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Adicionar Contato</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

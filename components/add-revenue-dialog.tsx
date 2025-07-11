"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface Revenue {
  id: string
  date: string
  description: string
  amount: number
  source: "servico" | "investimento" | "outros"
  createdAt: string
}

interface AddRevenueDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddRevenue: (revenue: Omit<Revenue, "id" | "createdAt">) => void
}

export function AddRevenueDialog({ open, onOpenChange, onAddRevenue }: AddRevenueDialogProps) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0], // Data atual como padrão
    description: "",
    amount: 0,
    source: "servico" as Revenue["source"],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.date || !formData.description || !formData.amount) {
      return
    }

    onAddRevenue(formData)

    // Reset form
    setFormData({
      date: new Date().toISOString().split("T")[0],
      description: "",
      amount: 0,
      source: "servico",
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
          <DialogTitle>Nova Receita</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date">Data *</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => handleChange("date", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Descreva a receita..."
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Valor (R$) *</Label>
            <Input
              id="amount"
              type="number"
              value={formData.amount}
              onChange={(e) => handleChange("amount", Number(e.target.value))}
              placeholder="0.00"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="source">Origem</Label>
            <Select value={formData.source} onValueChange={(value) => handleChange("source", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a origem da receita" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="servico">Serviço</SelectItem>
                <SelectItem value="investimento">Investimento</SelectItem>
                <SelectItem value="outros">Outros</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Adicionar Receita</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import type { Company } from "@/components/companies-page"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, X, ImageIcon } from "lucide-react"

interface EditCompanyDialogProps {
  company: Company
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdateCompany: (updates: Partial<Company>) => void
}

export function EditCompanyDialog({ company, open, onOpenChange, onUpdateCompany }: EditCompanyDialogProps) {
  const [formData, setFormData] = useState({
    companyName: "",
    startDate: "",
    revenue: 0,
    pendingTasks: 0,
    projectType: "gestao-trafego" as Company["projectType"],
    status: "ativo" as Company["status"],
    description: "",
    coverImage: "",
  })

  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (company) {
      setFormData({
        companyName: company.companyName,
        startDate: company.startDate,
        revenue: company.revenue,
        pendingTasks: company.pendingTasks,
        projectType: company.projectType,
        status: company.status,
        description: company.description,
        coverImage: company.coverImage || "",
      })
    }
  }, [company])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.companyName || !formData.startDate) {
      return
    }

    onUpdateCompany(formData)
    onOpenChange(false)
  }

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setFormData((prev) => ({ ...prev, coverImage: result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const removeCoverImage = () => {
    setFormData((prev) => ({ ...prev, coverImage: "" }))
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Empresa</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Cover Image Upload */}
          <div className="space-y-2">
            <Label>Foto de Capa da Empresa</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              {formData.coverImage ? (
                <div className="relative">
                  <img
                    src={formData.coverImage || "/placeholder.svg"}
                    alt="Capa da empresa"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={removeCoverImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-2">
                    <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                      <Upload className="mr-2 h-4 w-4" />
                      Escolher Imagem
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG até 5MB</p>
                </div>
              )}
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyName">Nome da Empresa *</Label>
            <Input
              id="companyName"
              value={formData.companyName}
              onChange={(e) => handleChange("companyName", e.target.value)}
              placeholder="Digite o nome da empresa"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição dos Serviços</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Descreva os serviços prestados para esta empresa"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="projectType">Tipo de Serviço</Label>
              <Select value={formData.projectType} onValueChange={(value) => handleChange("projectType", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gestao-trafego">Gestão de Tráfego</SelectItem>
                  <SelectItem value="criacao-ia">Criação de IA</SelectItem>
                  <SelectItem value="gestao-trafego-ia">Gestão de Tráfego + IA</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ativo">Ativo</SelectItem>
                  <SelectItem value="pausado">Pausado</SelectItem>
                  <SelectItem value="concluido">Concluído</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="revenue">Receita Gerada (R$)</Label>
              <Input
                id="revenue"
                type="number"
                value={formData.revenue}
                onChange={(e) => handleChange("revenue", Number(e.target.value))}
                placeholder="0"
                min="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pendingTasks">Tarefas Pendentes</Label>
              <Input
                id="pendingTasks"
                type="number"
                value={formData.pendingTasks}
                onChange={(e) => handleChange("pendingTasks", Number(e.target.value))}
                placeholder="0"
                min="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="startDate">Data de Início da Parceria *</Label>
            <Input
              id="startDate"
              type="date"
              value={formData.startDate}
              onChange={(e) => handleChange("startDate", e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Salvar Alterações</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

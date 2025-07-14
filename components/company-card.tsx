"use client"

import type { Company } from "@/components/companies-page"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Calendar,
  DollarSign,
  CheckSquare,
  MoreHorizontal,
  Trash2,
  Play,
  Pause,
  CheckCircle,
  ImageIcon,
  Edit,
  Plus,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface CompanyCardProps {
  company: Company
  onUpdate: (updates: Partial<Company>) => void
  onDelete: () => void
  onEdit: () => void
}

const projectTypeLabels = {
  "gestao-trafego": "Gestão de Tráfego",
  "criacao-ia": "Criação de IA",
  "gestao-trafego-ia": "Gestão de Tráfego + IA",
}

const projectTypeColors = {
  "gestao-trafego": "bg-blue-100 text-blue-800",
  "criacao-ia": "bg-purple-100 text-purple-800",
  "gestao-trafego-ia": "bg-gradient-to-r from-blue-100 to-purple-100 text-indigo-800",
}

const statusColors = {
  ativo: "bg-green-100 text-green-800",
  pausado: "bg-yellow-100 text-yellow-800",
  concluido: "bg-gray-100 text-gray-800",
}

const statusLabels = {
  ativo: "Ativo",
  pausado: "Pausado",
  concluido: "Concluído",
}

export function CompanyCard({ company, onUpdate, onDelete, onEdit }: CompanyCardProps) {
  const daysSinceStart = Math.floor((new Date().getTime() - new Date(company.startDate).getTime()) / (1000 * 3600 * 24))

  const handleStatusChange = (newStatus: Company["status"]) => {
    onUpdate({ status: newStatus })
  }

  const handleAddRevenue = () => {
    // Aqui será implementada a navegação para adicionar receita
    // Por enquanto, vamos simular um incremento
    const newRevenue = company.revenue + 1000
    onUpdate({ revenue: newRevenue })
  }

  const handleAddTask = () => {
    // Aqui será implementada a navegação para adicionar tarefa
    // Por enquanto, vamos simular um incremento
    const newTasks = company.pendingTasks + 1
    onUpdate({ pendingTasks: newTasks })
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      {/* Cover Image */}
      {company.coverImage ? (
        <div className="h-32 w-full overflow-hidden">
          <img
            src={company.coverImage || "/placeholder.svg"}
            alt={`Capa da empresa ${company.companyName}`}
            className="h-full w-full object-cover"
          />
        </div>
      ) : (
        <div className="h-32 w-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          <ImageIcon className="h-8 w-8 text-gray-400" />
        </div>
      )}

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold text-lg">{company.companyName}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{company.description}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onEdit}>
                <Edit className="mr-2 h-4 w-4" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange("ativo")}>
                <Play className="mr-2 h-4 w-4" />
                Ativar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange("pausado")}>
                <Pause className="mr-2 h-4 w-4" />
                Pausar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange("concluido")}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Concluir
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onDelete} className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="secondary" className={cn("text-xs", projectTypeColors[company.projectType])}>
            {projectTypeLabels[company.projectType]}
          </Badge>
          <Badge variant="secondary" className={cn("text-xs", statusColors[company.status])}>
            {statusLabels[company.status]}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Métricas Principais */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <DollarSign className="h-4 w-4" />
                <span>Receita Gerada</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 text-green-600 hover:bg-green-100"
                onClick={handleAddRevenue}
                title="Adicionar receita"
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            <div className="text-xl font-bold text-green-600">R$ {company.revenue.toLocaleString("pt-BR")}</div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckSquare className="h-4 w-4" />
                <span>Tarefas Pendentes</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 text-orange-600 hover:bg-orange-100"
                onClick={handleAddTask}
                title="Adicionar tarefa"
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            <div className={cn("text-xl font-bold", company.pendingTasks > 0 ? "text-orange-600" : "text-green-600")}>
              {company.pendingTasks}
            </div>
          </div>
        </div>

        {/* Informações de Data */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Data de Início</span>
            </div>
            <span className="font-medium">{new Date(company.startDate).toLocaleDateString("pt-BR")}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Tempo de Parceria</span>
            <span className="font-medium">{daysSinceStart} dias</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Última Atualização</span>
            <span className="font-medium">{new Date(company.lastUpdate).toLocaleDateString("pt-BR")}</span>
          </div>
        </div>

        {/* Barra de Progresso Visual */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Status da Empresa</span>
            <span className="font-medium">{statusLabels[company.status]}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                company.status === "ativo" && "bg-blue-500",
                company.status === "pausado" && "bg-yellow-500",
                company.status === "concluido" && "bg-green-500",
              )}
              style={{
                width: company.status === "concluido" ? "100%" : company.status === "ativo" ? "60%" : "30%",
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

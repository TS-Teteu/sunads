"use client"

import type { Project } from "@/components/projects-page"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Calendar, DollarSign, CheckSquare, MoreHorizontal, Trash2, Play, Pause, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
  project: Project
  onUpdate: (updates: Partial<Project>) => void
  onDelete: () => void
}

const projectTypeLabels = {
  "gestao-trafego": "Gestão de Tráfego",
  "criacao-ia": "Criação de IA",
}

const projectTypeColors = {
  "gestao-trafego": "bg-blue-100 text-blue-800",
  "criacao-ia": "bg-purple-100 text-purple-800",
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

export function ProjectCard({ project, onUpdate, onDelete }: ProjectCardProps) {
  const daysSinceStart = Math.floor((new Date().getTime() - new Date(project.startDate).getTime()) / (1000 * 3600 * 24))

  const handleStatusChange = (newStatus: Project["status"]) => {
    onUpdate({ status: newStatus })
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold text-lg">{project.clientName}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
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
          <Badge variant="secondary" className={cn("text-xs", projectTypeColors[project.projectType])}>
            {projectTypeLabels[project.projectType]}
          </Badge>
          <Badge variant="secondary" className={cn("text-xs", statusColors[project.status])}>
            {statusLabels[project.status]}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Métricas Principais */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <DollarSign className="h-4 w-4" />
              <span>Receita Gerada</span>
            </div>
            <div className="text-xl font-bold text-green-600">R$ {project.revenue.toLocaleString("pt-BR")}</div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckSquare className="h-4 w-4" />
              <span>Tarefas Pendentes</span>
            </div>
            <div className={cn("text-xl font-bold", project.pendingTasks > 0 ? "text-orange-600" : "text-green-600")}>
              {project.pendingTasks}
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
            <span className="font-medium">{new Date(project.startDate).toLocaleDateString("pt-BR")}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Tempo de Projeto</span>
            <span className="font-medium">{daysSinceStart} dias</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Última Atualização</span>
            <span className="font-medium">{new Date(project.lastUpdate).toLocaleDateString("pt-BR")}</span>
          </div>
        </div>

        {/* Barra de Progresso Visual */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Status do Projeto</span>
            <span className="font-medium">{statusLabels[project.status]}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                project.status === "ativo" && "bg-blue-500",
                project.status === "pausado" && "bg-yellow-500",
                project.status === "concluido" && "bg-green-500",
              )}
              style={{
                width: project.status === "concluido" ? "100%" : project.status === "ativo" ? "60%" : "30%",
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

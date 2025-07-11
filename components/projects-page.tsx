"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Filter } from "lucide-react"
import { ProjectCard } from "@/components/project-card"
import { AddProjectDialog } from "@/components/add-project-dialog"

export interface Project {
  id: string
  clientName: string
  startDate: string
  revenue: number
  pendingTasks: number
  projectType: "gestao-trafego" | "criacao-ia"
  status: "ativo" | "pausado" | "concluido"
  description: string
  lastUpdate: string
}

const initialProjects: Project[] = [
  {
    id: "1",
    clientName: "ABC Marketing",
    startDate: "2023-08-15",
    revenue: 45000,
    pendingTasks: 3,
    projectType: "gestao-trafego",
    status: "ativo",
    description: "Gestão completa de tráfego pago para e-commerce",
    lastUpdate: "2024-01-10",
  },
  {
    id: "2",
    clientName: "Tech Solutions",
    startDate: "2023-10-20",
    revenue: 78000,
    pendingTasks: 5,
    projectType: "criacao-ia",
    status: "ativo",
    description: "Desenvolvimento de chatbot com IA para atendimento",
    lastUpdate: "2024-01-12",
  },
  {
    id: "3",
    clientName: "Loja Virtual Plus",
    startDate: "2023-06-10",
    revenue: 32000,
    pendingTasks: 1,
    projectType: "gestao-trafego",
    status: "ativo",
    description: "Campanhas de Facebook e Google Ads",
    lastUpdate: "2024-01-08",
  },
  {
    id: "4",
    clientName: "Consultoria Empresarial",
    startDate: "2023-12-01",
    revenue: 95000,
    pendingTasks: 7,
    projectType: "criacao-ia",
    status: "ativo",
    description: "Sistema de IA para análise de dados empresariais",
    lastUpdate: "2024-01-11",
  },
  {
    id: "5",
    clientName: "Restaurante Gourmet",
    startDate: "2023-09-05",
    revenue: 18000,
    pendingTasks: 0,
    projectType: "gestao-trafego",
    status: "concluido",
    description: "Campanha de lançamento e gestão de redes sociais",
    lastUpdate: "2023-12-20",
  },
  {
    id: "6",
    clientName: "Clínica Médica Vida",
    startDate: "2023-11-15",
    revenue: 52000,
    pendingTasks: 4,
    projectType: "criacao-ia",
    status: "ativo",
    description: "Assistente virtual para agendamento de consultas",
    lastUpdate: "2024-01-09",
  },
]

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<string>("todos")
  const [filterStatus, setFilterStatus] = useState<string>("todos")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const handleAddProject = (newProject: Omit<Project, "id" | "lastUpdate">) => {
    const project: Project = {
      ...newProject,
      id: Date.now().toString(),
      lastUpdate: new Date().toISOString().split("T")[0],
    }
    setProjects([...projects, project])
  }

  const handleUpdateProject = (projectId: string, updates: Partial<Project>) => {
    setProjects(
      projects.map((project) =>
        project.id === projectId
          ? { ...project, ...updates, lastUpdate: new Date().toISOString().split("T")[0] }
          : project,
      ),
    )
  }

  const handleDeleteProject = (projectId: string) => {
    setProjects(projects.filter((project) => project.id !== projectId))
  }

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.clientName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "todos" || project.projectType === filterType
    const matchesStatus = filterStatus === "todos" || project.status === filterStatus
    return matchesSearch && matchesType && matchesStatus
  })

  const totalRevenue = projects.reduce((sum, project) => sum + project.revenue, 0)
  const activeProjects = projects.filter((p) => p.status === "ativo").length
  const totalPendingTasks = projects.reduce((sum, project) => sum + project.pendingTasks, 0)

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Projetos</h2>
          <p className="text-muted-foreground">Acompanhe todos os seus projetos por cliente</p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Projeto
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-lg border bg-card p-4">
          <div className="text-2xl font-bold text-green-600">R$ {totalRevenue.toLocaleString("pt-BR")}</div>
          <p className="text-sm text-muted-foreground">Receita Total</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-2xl font-bold text-blue-600">{activeProjects}</div>
          <p className="text-sm text-muted-foreground">Projetos Ativos</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-2xl font-bold text-orange-600">{totalPendingTasks}</div>
          <p className="text-sm text-muted-foreground">Tarefas Pendentes</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-2xl font-bold text-purple-600">{projects.length}</div>
          <p className="text-sm text-muted-foreground">Total de Projetos</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por cliente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Tipo de Projeto" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os Tipos</SelectItem>
              <SelectItem value="gestao-trafego">Gestão de Tráfego</SelectItem>
              <SelectItem value="criacao-ia">Criação de IA</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos Status</SelectItem>
              <SelectItem value="ativo">Ativo</SelectItem>
              <SelectItem value="pausado">Pausado</SelectItem>
              <SelectItem value="concluido">Concluído</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onUpdate={(updates) => handleUpdateProject(project.id, updates)}
            onDelete={() => handleDeleteProject(project.id)}
          />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="text-muted-foreground">Nenhum projeto encontrado</div>
          <p className="text-sm text-muted-foreground">Tente ajustar os filtros ou adicione um novo projeto</p>
        </div>
      )}

      <AddProjectDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} onAddProject={handleAddProject} />
    </div>
  )
}

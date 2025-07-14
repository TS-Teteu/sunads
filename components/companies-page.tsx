"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Filter } from "lucide-react"
import { CompanyCard } from "@/components/company-card"
import { AddCompanyDialog } from "@/components/add-company-dialog"
import { EditCompanyDialog } from "@/components/edit-company-dialog"

export interface Company {
  id: string
  companyName: string
  startDate: string
  revenue: number
  pendingTasks: number
  projectType: "gestao-trafego" | "criacao-ia" | "gestao-trafego-ia"
  status: "ativo" | "pausado" | "concluido"
  description: string
  lastUpdate: string
  coverImage?: string
}

const initialCompanies: Company[] = []

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>(initialCompanies)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<string>("todos")
  const [filterStatus, setFilterStatus] = useState<string>("todos")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingCompany, setEditingCompany] = useState<Company | null>(null)

  const handleAddCompany = (newCompany: Omit<Company, "id" | "lastUpdate">) => {
    const company: Company = {
      ...newCompany,
      id: Date.now().toString(),
      lastUpdate: new Date().toISOString().split("T")[0],
    }
    setCompanies([...companies, company])
  }

  const handleUpdateCompany = (companyId: string, updates: Partial<Company>) => {
    setCompanies(
      companies.map((company) =>
        company.id === companyId
          ? { ...company, ...updates, lastUpdate: new Date().toISOString().split("T")[0] }
          : company,
      ),
    )
  }

  const handleDeleteCompany = (companyId: string) => {
    setCompanies(companies.filter((company) => company.id !== companyId))
  }

  const handleEditCompany = (company: Company) => {
    setEditingCompany(company)
  }

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch = company.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "todos" || company.projectType === filterType
    const matchesStatus = filterStatus === "todos" || company.status === filterStatus
    return matchesSearch && matchesType && matchesStatus
  })

  const totalRevenue = companies.reduce((sum, company) => sum + company.revenue, 0)
  const activeCompanies = companies.filter((c) => c.status === "ativo").length
  const totalPendingTasks = companies.reduce((sum, company) => sum + company.pendingTasks, 0)

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Empresas</h2>
          <p className="text-muted-foreground">Acompanhe a receita gerada por cada empresa</p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nova Empresa
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-lg border bg-card p-4">
          <div className="text-2xl font-bold text-green-600">R$ {totalRevenue.toLocaleString("pt-BR")}</div>
          <p className="text-sm text-muted-foreground">Receita Total</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-2xl font-bold text-blue-600">{activeCompanies}</div>
          <p className="text-sm text-muted-foreground">Empresas Ativas</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-2xl font-bold text-orange-600">{totalPendingTasks}</div>
          <p className="text-sm text-muted-foreground">Tarefas Pendentes</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-2xl font-bold text-purple-600">{companies.length}</div>
          <p className="text-sm text-muted-foreground">Total de Empresas</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por empresa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[200px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Tipo de Serviço" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os Tipos</SelectItem>
              <SelectItem value="gestao-trafego">Gestão de Tráfego</SelectItem>
              <SelectItem value="criacao-ia">Criação de IA</SelectItem>
              <SelectItem value="gestao-trafego-ia">Gestão de Tráfego + IA</SelectItem>
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

      {/* Companies Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCompanies.map((company) => (
          <CompanyCard
            key={company.id}
            company={company}
            onUpdate={(updates) => handleUpdateCompany(company.id, updates)}
            onDelete={() => handleDeleteCompany(company.id)}
            onEdit={() => handleEditCompany(company)}
          />
        ))}
      </div>

      {filteredCompanies.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="text-muted-foreground">Nenhuma empresa encontrada</div>
          <p className="text-sm text-muted-foreground">Tente ajustar os filtros ou adicione uma nova empresa</p>
        </div>
      )}

      <AddCompanyDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} onAddCompany={handleAddCompany} />

      {editingCompany && (
        <EditCompanyDialog
          company={editingCompany}
          open={!!editingCompany}
          onOpenChange={(open) => !open && setEditingCompany(null)}
          onUpdateCompany={(updates) => {
            handleUpdateCompany(editingCompany.id, updates)
            setEditingCompany(null)
          }}
        />
      )}
    </div>
  )
}

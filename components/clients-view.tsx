"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Link, Edit, Trash2 } from "lucide-react" // Importar Link, Edit, Trash2
import { AddClientDialog } from "@/components/add-client-dialog"
import { EditClientDialog } from "@/components/edit-client-dialog" // Importar o novo diálogo de edição
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export interface Client {
  id: string
  name: string
  companyName: string
  phone: string
  email: string
  stage: "kickoff" | "ativo" | "inativo"
  priorityStatus: "critica" | "escalando" | "testando-criativos" | "ok"
  groupLink?: string // Novo campo para o link do grupo
  createdAt: string
}

const initialClients: Client[] = [
  {
    id: "cl1",
    name: "João Silva",
    companyName: "ABC Marketing",
    phone: "(11) 98765-4321",
    email: "joao.silva@abc.com",
    stage: "kickoff",
    priorityStatus: "critica",
    groupLink: "https://chat.whatsapp.com/ABCGroup", // Exemplo de link
    createdAt: "2024-01-01",
  },
  {
    id: "cl2",
    name: "Maria Santos",
    companyName: "Tech Solutions",
    phone: "(21) 99876-5432",
    email: "maria.santos@tech.com",
    stage: "ativo",
    priorityStatus: "ok",
    groupLink: "",
    createdAt: "2023-11-15",
  },
  {
    id: "cl3",
    name: "Pedro Costa",
    companyName: "Loja Virtual Plus",
    phone: "(31) 97654-3210",
    email: "pedro.costa@lojavirtual.com",
    stage: "inativo",
    priorityStatus: "escalando",
    groupLink: "https://chat.whatsapp.com/LojaPlus",
    createdAt: "2023-09-01",
  },
  {
    id: "cl4",
    name: "Ana Lima",
    companyName: "Consultoria Empresarial",
    phone: "(41) 96543-2109",
    email: "ana.lima@consultoria.com",
    stage: "ativo",
    priorityStatus: "testando-criativos",
    groupLink: "",
    createdAt: "2024-02-10",
  },
  {
    id: "cl5",
    name: "Carlos Mendes",
    companyName: "Restaurante Gourmet",
    phone: "(51) 95432-1098",
    email: "carlos.mendes@gourmet.com",
    stage: "kickoff",
    priorityStatus: "critica",
    groupLink: "https://chat.whatsapp.com/Gourmet",
    createdAt: "2024-03-05",
  },
  {
    id: "cl6",
    name: "Mariana Fernandes",
    companyName: "Moda Urbana",
    phone: "(81) 91234-5678",
    email: "mariana.f@moda.com",
    stage: "ativo",
    priorityStatus: "ok",
    groupLink: "",
    createdAt: "2024-04-10",
  },
  {
    id: "cl7",
    name: "Roberto Almeida",
    companyName: "Construtora Ideal",
    phone: "(71) 92345-6789",
    email: "roberto.a@construtora.com",
    stage: "ativo",
    priorityStatus: "escalando",
    groupLink: "https://chat.whatsapp.com/Construtora",
    createdAt: "2024-05-01",
  },
]

const stageColors = {
  kickoff: "bg-blue-100 text-blue-800",
  ativo: "bg-green-100 text-green-800",
  inativo: "bg-gray-100 text-gray-800",
}

const stageLabels = {
  kickoff: "Kickoff",
  ativo: "Ativo",
  inativo: "Inativo",
}

const priorityStatusColors = {
  critica: "bg-red-600 text-white",
  escalando: "bg-orange-600 text-white",
  "testando-criativos": "bg-purple-600 text-white",
  ok: "bg-green-600 text-white",
}

const priorityStatusLabels = {
  critica: "Crítica",
  escalando: "Escalando",
  "testando-criativos": "Testando criativos",
  ok: "Ok",
}

export function ClientsView() {
  const [clients, setClients] = useState<Client[]>(initialClients)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterPriority, setFilterPriority] = useState<string>("todos")
  const [isAddClientDialogOpen, setIsAddClientDialogOpen] = useState(false)
  const [isEditClientDialogOpen, setIsEditClientDialogOpen] = useState(false) // Estado para o diálogo de edição
  const [editingClient, setEditingClient] = useState<Client | null>(null) // Cliente sendo editado

  const handleAddClient = (newClient: Omit<Client, "id" | "createdAt">) => {
    const client: Client = {
      ...newClient,
      id: `cl${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
    }
    setClients((prevClients) => [...prevClients, client])
  }

  const handleUpdateClientPriority = (clientId: string, newPriority: Client["priorityStatus"]) => {
    setClients((prevClients) =>
      prevClients.map((client) => (client.id === clientId ? { ...client, priorityStatus: newPriority } : client)),
    )
  }

  const handleUpdateClientStage = (clientId: string, newStage: Client["stage"]) => {
    setClients((prevClients) =>
      prevClients.map((client) => (client.id === clientId ? { ...client, stage: newStage } : client)),
    )
  }

  const handleUpdateClient = (updatedClient: Client) => {
    setClients((prevClients) => prevClients.map((client) => (client.id === updatedClient.id ? updatedClient : client)))
    setIsEditClientDialogOpen(false)
    setEditingClient(null)
  }

  const handleDeleteClient = (clientId: string) => {
    setClients((prevClients) => prevClients.filter((client) => client.id !== clientId))
  }

  const filteredClients = clients.filter((client) => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPriority = filterPriority === "todos" || client.priorityStatus === filterPriority
    return matchesSearch && matchesPriority
  })

  const stages: Client["stage"][] = ["kickoff", "ativo", "inativo"]

  // Drag & Drop Handlers
  const handleDragStart = (e: React.DragEvent, clientId: string) => {
    e.dataTransfer.setData("text/plain", clientId)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault() // Necessário para permitir o drop
  }

  const handleDrop = (e: React.DragEvent, targetStage: Client["stage"]) => {
    e.preventDefault()
    const clientId = e.dataTransfer.getData("text/plain")
    if (clientId) {
      handleUpdateClientStage(clientId, targetStage)
    }
  }

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Clientes</h2>
          <p className="text-muted-foreground">Gerencie seus clientes por etapa do ciclo de vida</p>
        </div>
        <Button onClick={() => setIsAddClientDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Cliente
        </Button>
      </div>

      {/* Search Bar and Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Pesquisar cliente por nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterPriority} onValueChange={setFilterPriority}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filtrar por Prioridade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todas as Prioridades</SelectItem>
            <SelectItem value="critica">Crítica</SelectItem>
            <SelectItem value="escalando">Escalando</SelectItem>
            <SelectItem value="testando-criativos">Testando criativos</SelectItem>
            <SelectItem value="ok">Ok</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Clients Lists by Stage */}
      {stages.map((stage) => (
        <Card key={stage} className="mb-6">
          <CardHeader>
            <CardTitle className="capitalize flex items-center gap-2">
              {stage === "ativo" && "✅ "}
              {stage === "kickoff" && "👨🏽‍💻 "}
              {stage === "inativo" && "😴 "}
              {stageLabels[stage]} ({filteredClients.filter((client) => client.stage === stage).length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="rounded-md border" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, stage)}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[150px] text-center">Nome</TableHead>
                    <TableHead className="text-center">Empresa</TableHead>
                    <TableHead className="text-center">Prioridade</TableHead>
                    <TableHead className="text-center">Grupo</TableHead>
                    <TableHead className="text-center">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.filter((client) => client.stage === stage).length > 0 ? (
                    filteredClients
                      .filter((client) => client.stage === stage)
                      .map((client) => (
                        <TableRow key={client.id} draggable="true" onDragStart={(e) => handleDragStart(e, client.id)}>
                          <TableCell className="font-medium text-center">{client.name}</TableCell>
                          <TableCell className="text-center">{client.companyName}</TableCell>
                          <TableCell className="text-center">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Badge
                                  variant="secondary"
                                  className={cn(
                                    "px-4 py-2 rounded-lg cursor-pointer",
                                    priorityStatusColors[client.priorityStatus],
                                  )}
                                >
                                  {priorityStatusLabels[client.priorityStatus]}
                                </Badge>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="center">
                                {Object.entries(priorityStatusLabels).map(([key, label]) => (
                                  <DropdownMenuItem
                                    key={key}
                                    onSelect={() =>
                                      handleUpdateClientPriority(client.id, key as Client["priorityStatus"])
                                    }
                                  >
                                    {label}
                                  </DropdownMenuItem>
                                ))}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                          <TableCell className="text-center">
                            {client.groupLink ? (
                              <a href={client.groupLink} target="_blank" rel="noopener noreferrer">
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <Link className="h-4 w-4" />
                                </Button>
                              </a>
                            ) : (
                              <span className="text-muted-foreground text-xs">N/A</span>
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => {
                                  setEditingClient(client)
                                  setIsEditClientDialogOpen(true)
                                }}
                              >
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Editar</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-red-600 hover:bg-red-100"
                                onClick={() => handleDeleteClient(client.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Excluir</span>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                        Nenhum cliente nesta etapa.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      ))}

      <AddClientDialog
        open={isAddClientDialogOpen}
        onOpenChange={setIsAddClientDialogOpen}
        onAddClient={handleAddClient}
      />

      {editingClient && (
        <EditClientDialog
          open={isEditClientDialogOpen}
          onOpenChange={setIsEditClientDialogOpen}
          client={editingClient}
          onUpdateClient={handleUpdateClient}
        />
      )}
    </div>
  )
}

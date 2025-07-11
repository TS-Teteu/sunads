"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AddContractDialog } from "@/components/add-contract-dialog"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export interface Contract {
  id: string
  companyName: string
  responsible: string // Responsável pelo contrato
  value: number
  startDate: string // Data de início do contrato
  endDate: string // Data de término do contrato
  status: "ativo" | "expirado" | "cancelado"
  attachmentUrl?: string // URL do anexo do contrato
  createdAt: string
}

const initialContracts: Contract[] = [
  {
    id: "con1",
    companyName: "ABC Marketing",
    responsible: "João Silva",
    value: 18000.0,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    status: "ativo",
    attachmentUrl: "/placeholder.pdf", // Exemplo de URL de anexo
    createdAt: "2023-12-28",
  },
  {
    id: "con2",
    companyName: "Tech Solutions",
    responsible: "Maria Santos",
    value: 55000.0,
    startDate: "2023-10-15",
    endDate: "2024-10-14",
    status: "ativo",
    attachmentUrl: "/placeholder.pdf",
    createdAt: "2023-10-10",
  },
  {
    id: "con3",
    companyName: "Loja Virtual Plus",
    responsible: "Pedro Costa",
    value: 9000.0,
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    status: "expirado",
    attachmentUrl: "/placeholder.pdf",
    createdAt: "2022-12-25",
  },
  {
    id: "con4",
    companyName: "Consultoria Empresarial",
    responsible: "Ana Lima",
    value: 100000.0,
    startDate: "2024-02-01",
    endDate: "2025-01-31",
    status: "ativo",
    createdAt: "2024-01-28",
  },
]

const statusColors = {
  ativo: "bg-green-100 text-green-800",
  expirado: "bg-red-100 text-red-800",
  cancelado: "bg-gray-100 text-gray-800",
}

export function ContractsView() {
  const [contracts, setContracts] = useState<Contract[]>(initialContracts)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddContractDialogOpen, setIsAddContractDialogOpen] = useState(false)

  const handleAddContract = (newContract: Omit<Contract, "id" | "createdAt">) => {
    const contract: Contract = {
      ...newContract,
      id: `con${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
    }
    setContracts([...contracts, contract])
  }

  const filteredContracts = contracts.filter((contract) =>
    contract.companyName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">Contratos</h3>
          <p className="text-muted-foreground">Gerencie seus contratos comerciais</p>
        </div>
        <Button onClick={() => setIsAddContractDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Contrato
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Pesquisar contrato por nome da empresa..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Contracts List Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Contratos</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Empresa</TableHead>
                  <TableHead>Responsável</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                  <TableHead>Início</TableHead>
                  <TableHead>Término</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Anexo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContracts.length > 0 ? (
                  filteredContracts.map((contract) => (
                    <TableRow key={contract.id}>
                      <TableCell className="font-medium">{contract.companyName}</TableCell>
                      <TableCell>{contract.responsible}</TableCell>
                      <TableCell className="text-right">R$ {contract.value.toLocaleString("pt-BR")}</TableCell>
                      <TableCell>{new Date(contract.startDate).toLocaleDateString("pt-BR")}</TableCell>
                      <TableCell>{new Date(contract.endDate).toLocaleDateString("pt-BR")}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary" className={cn("text-xs", statusColors[contract.status])}>
                          {contract.status.charAt(0).toUpperCase() + contract.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        {contract.attachmentUrl ? (
                          <a href={contract.attachmentUrl} target="_blank" rel="noopener noreferrer">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Download className="h-4 w-4" />
                            </Button>
                          </a>
                        ) : (
                          <span className="text-muted-foreground text-xs">N/A</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                      Nenhum contrato encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <AddContractDialog
        open={isAddContractDialogOpen}
        onOpenChange={setIsAddContractDialogOpen}
        onAddContract={handleAddContract}
      />
    </div>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AddProposalDialog } from "@/components/add-proposal-dialog"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export interface Proposal {
  id: string
  companyName: string
  responsible: string // Responsável pela proposta
  proposalType: string // Ex: "Serviços de Marketing", "Desenvolvimento de Software"
  value: number
  proposalDate: string // Data da proposta
  category: "A" | "B" // Tipo A ou Tipo B
  status: "enviada" | "aprovada" | "rejeitada" | "rascunho"
  createdAt: string
}

const initialProposals: Proposal[] = []

const categoryColors = {
  A: "bg-blue-100 text-blue-800",
  B: "bg-purple-100 text-purple-800",
}

const statusColors = {
  enviada: "bg-yellow-100 text-yellow-800",
  aprovada: "bg-green-100 text-green-800",
  rejeitada: "bg-red-100 text-red-800",
  rascunho: "bg-gray-100 text-gray-800",
}

export function ProposalsView() {
  const [proposals, setProposals] = useState<Proposal[]>(initialProposals)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddProposalDialogOpen, setIsAddProposalDialogOpen] = useState(false)

  const handleAddProposal = (newProposal: Omit<Proposal, "id" | "createdAt">) => {
    const proposal: Proposal = {
      ...newProposal,
      id: `p${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
    }
    setProposals([...proposals, proposal])
  }

  const filteredProposals = proposals.filter((proposal) =>
    proposal.companyName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">Propostas</h3>
          <p className="text-muted-foreground">Gerencie suas propostas comerciais</p>
        </div>
        <Button onClick={() => setIsAddProposalDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nova Proposta
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Pesquisar proposta por nome da empresa..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Proposals List Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Propostas</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Empresa</TableHead>
                  <TableHead>Responsável</TableHead>
                  <TableHead>Tipo de Proposta</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead className="text-center">Categoria</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProposals.length > 0 ? (
                  filteredProposals.map((proposal) => (
                    <TableRow key={proposal.id}>
                      <TableCell className="font-medium">{proposal.companyName}</TableCell>
                      <TableCell>{proposal.responsible}</TableCell>
                      <TableCell>{proposal.proposalType}</TableCell>
                      <TableCell className="text-right">R$ {proposal.value.toLocaleString("pt-BR")}</TableCell>
                      <TableCell>{new Date(proposal.proposalDate).toLocaleDateString("pt-BR")}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary" className={cn("text-xs", categoryColors[proposal.category])}>
                          Tipo {proposal.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary" className={cn("text-xs", statusColors[proposal.status])}>
                          {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                      Nenhuma proposta encontrada.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <AddProposalDialog
        open={isAddProposalDialogOpen}
        onOpenChange={setIsAddProposalDialogOpen}
        onAddProposal={handleAddProposal}
      />
    </div>
  )
}

"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, DollarSign, TrendingUp, XCircle } from "lucide-react"
import { AddDealDialog } from "@/components/add-deal-dialog"
import { PipelineColumn } from "@/components/pipeline-column"
import { ReasonForLossDialog } from "@/components/reason-for-loss-dialog"
import type { Deal } from "@/components/commercial-page" // Importar Deal do CommercialPage

interface PipelineViewProps {
  deals: Deal[]
  onAddDeal: (newDeal: Omit<Deal, "id" | "createdAt">) => void
  onUpdateDealStage: (dealId: string, newStage: Deal["stage"]) => void
  onSaveReasonForLoss: (dealId: string, reason: string) => void
  onDeleteDeal: (dealId: string) => void
}

const pipelineStages = [
  { id: "qualificacao", title: "Qualificação", color: "bg-blue-100" },
  { id: "negociacao", title: "Negociação", color: "bg-yellow-100" },
  { id: "fechado", title: "Fechado", color: "bg-green-100" }, // Renomeado
  { id: "perdido", title: "Perdido", color: "bg-red-100" }, // Renomeado
] as const

export function PipelineView({
  deals,
  onAddDeal,
  onUpdateDealStage,
  onSaveReasonForLoss,
  onDeleteDeal,
}: PipelineViewProps) {
  const [isAddDealDialogOpen, setIsAddDealDialogOpen] = useState(false)
  const [isReasonForLossDialogOpen, setIsReasonForLossDialogOpen] = useState(false)
  const [dealToLose, setDealToLose] = useState<string | null>(null)

  const handleUpdateStageAndReason = (dealId: string, newStage: Deal["stage"]) => {
    if (newStage === "perdido") {
      // Usar o novo nome
      setDealToLose(dealId)
      setIsReasonForLossDialogOpen(true)
    } else {
      onUpdateDealStage(dealId, newStage)
    }
  }

  const getDealsByStage = (stage: Deal["stage"]) => {
    return deals.filter((deal) => deal.stage === stage)
  }

  const totalPipelineValue = deals
    .filter((deal) => deal.stage !== "fechado" && deal.stage !== "perdido") // Usar os novos nomes
    .reduce((sum, deal) => sum + deal.value, 0)

  const totalClosedWonValue = deals
    .filter((deal) => deal.stage === "fechado") // Usar o novo nome
    .reduce((sum, deal) => sum + deal.value, 0)

  const totalLostValue = deals
    .filter((deal) => deal.stage === "perdido") // Usar o novo nome
    .reduce((sum, deal) => sum + deal.value, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">Pipeline de Negócios</h3>
          <p className="text-muted-foreground">Gerencie suas oportunidades de vendas</p>
        </div>
        <Button onClick={() => setIsAddDealDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nova Oportunidade
        </Button>
      </div>

      {/* Pipeline Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Total no Pipeline</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {totalPipelineValue.toLocaleString("pt-BR")}</div>
            <p className="text-xs text-muted-foreground">Oportunidades em andamento</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Fechado</CardTitle> {/* Renomeado */}
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">R$ {totalClosedWonValue.toLocaleString("pt-BR")}</div>
            <p className="text-xs text-muted-foreground">Vendas realizadas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Perdido</CardTitle> {/* Renomeado */}
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">R$ {totalLostValue.toLocaleString("pt-BR")}</div>
            <p className="text-xs text-muted-foreground">Oportunidades perdidas</p>
          </CardContent>
        </Card>
      </div>

      {/* Pipeline Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-[calc(100vh-300px)]">
        {pipelineStages.map((stage) => (
          <PipelineColumn
            key={stage.id}
            title={stage.title}
            color={stage.color}
            stageId={stage.id}
            deals={getDealsByStage(stage.id)}
            onUpdateDealStage={handleUpdateStageAndReason} // Usar a nova função
            onDeleteDeal={onDeleteDeal}
          />
        ))}
      </div>

      <AddDealDialog open={isAddDealDialogOpen} onOpenChange={setIsAddDealDialogOpen} onAddDeal={onAddDeal} />

      {dealToLose && (
        <ReasonForLossDialog
          open={isReasonForLossDialogOpen}
          onOpenChange={setIsReasonForLossDialogOpen}
          dealId={dealToLose}
          onSaveReason={onSaveReasonForLoss}
        />
      )}
    </div>
  )
}

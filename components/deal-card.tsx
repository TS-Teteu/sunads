"use client"

import type React from "react"
import type { Deal } from "@/components/commercial-page" // Importar Deal do CommercialPage
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, DollarSign, Trash2, Info } from "lucide-react"
import { cn } from "@/lib/utils"

interface DealCardProps {
  deal: Deal
  onDelete: () => void
}

export function DealCard({ deal, onDelete }: DealCardProps) {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("text/plain", deal.id)
  }

  const isOverdue =
    new Date(deal.expectedCloseDate) < new Date() && deal.stage !== "fechado" && deal.stage !== "perdido" // Nomes atualizados

  return (
    <Card
      className="cursor-grab hover:shadow-md transition-shadow duration-200 bg-white"
      draggable
      onDragStart={handleDragStart}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <h4 className="font-medium text-sm leading-tight">{deal.title}</h4>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 hover:bg-red-100 hover:text-red-600"
            onClick={onDelete}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">{deal.clientName}</p>
      </CardHeader>

      <CardContent className="pt-0 space-y-2">
        <div className="flex items-center gap-2 text-sm font-bold text-green-600">
          <DollarSign className="h-4 w-4" />
          <span>R$ {deal.value.toLocaleString("pt-BR")}</span>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Calendar className="h-3 w-3" />
          <span className={cn(isOverdue && "text-red-600 font-medium")}>
            {new Date(deal.expectedCloseDate).toLocaleDateString("pt-BR")}
          </span>
        </div>

        {deal.reasonForLoss && (
          <div className="flex items-start gap-2 text-xs text-red-600 bg-red-50 p-2 rounded-md mt-2">
            <Info className="h-3 w-3 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-medium">Motivo da Perda:</span> {deal.reasonForLoss}
            </div>
          </div>
        )}

        <div className="text-xs text-gray-400 mt-2">
          Criado em: {new Date(deal.createdAt).toLocaleDateString("pt-BR")}
        </div>
      </CardContent>
    </Card>
  )
}

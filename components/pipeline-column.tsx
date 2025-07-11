"use client"

import type React from "react"
import { useState } from "react"
import type { Deal } from "@/components/pipeline-view"
import { DealCard } from "@/components/deal-card"
import { cn } from "@/lib/utils"

interface PipelineColumnProps {
  title: string
  color: string
  stageId: Deal["stage"]
  deals: Deal[]
  onUpdateDealStage: (dealId: string, newStage: Deal["stage"]) => void
  onDeleteDeal: (dealId: string) => void
}

export function PipelineColumn({ title, color, stageId, deals, onUpdateDealStage, onDeleteDeal }: PipelineColumnProps) {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const dealId = e.dataTransfer.getData("text/plain")
    if (dealId) {
      onUpdateDealStage(dealId, stageId)
    }
  }

  const totalValueInStage = deals.reduce((sum, deal) => sum + deal.value, 0)

  return (
    <div
      className={cn(
        "flex flex-col rounded-lg border-2 border-dashed border-gray-200 p-4 transition-all duration-200",
        color,
        isDragOver && "border-blue-400 bg-blue-50",
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <span className="bg-white px-2 py-1 rounded-full text-sm font-medium text-gray-600">{deals.length}</span>
      </div>
      <div className="text-sm text-muted-foreground mb-4">
        Total: <span className="font-bold">R$ {totalValueInStage.toLocaleString("pt-BR")}</span>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto">
        {deals.map((deal) => (
          <DealCard key={deal.id} deal={deal} onDelete={() => onDeleteDeal(deal.id)} />
        ))}

        {deals.length === 0 && (
          <div className="flex items-center justify-center h-32 text-gray-400 text-sm">Nenhuma oportunidade</div>
        )}
      </div>
    </div>
  )
}

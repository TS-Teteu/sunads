"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Deal } from "@/components/commercial-page" // Importar Deal do CommercialPage

interface PipelineFunnelChartProps {
  deals: Deal[]
}

export function PipelineFunnelChart({ deals }: PipelineFunnelChartProps) {
  const qualificacaoCount = deals.filter((d) => d.stage === "qualificacao").length
  const negociacaoCount = deals.filter((d) => d.stage === "negociacao").length
  const fechadoCount = deals.filter((d) => d.stage === "fechado").length // Renomeado
  const perdidoCount = deals.filter((d) => d.stage === "perdido").length // Renomeado

  const qualificacaoToNegociacaoRate = qualificacaoCount > 0 ? (negociacaoCount / qualificacaoCount) * 100 : 0
  const negociacaoToFechadoRate = negociacaoCount > 0 ? (fechadoCount / negociacaoCount) * 100 : 0 // Renomeado
  const negociacaoToPerdidoRate = negociacaoCount > 0 ? (perdidoCount / negociacaoCount) * 100 : 0 // Renomeado

  const FunnelStage = ({ title, count, color }: { title: string; count: number; color: string }) => (
    <div className={cn("flex items-center justify-between p-3 rounded-md", color)}>
      <span className="font-medium text-sm">{title}</span>
      <span className="font-bold text-lg">{count}</span>
    </div>
  )

  const ConversionRate = ({ rate, label, isLoss = false }: { rate: number; label: string; isLoss?: boolean }) => (
    <div className="flex flex-col items-center text-sm text-muted-foreground my-2">
      <ArrowDown className={cn("h-5 w-5", isLoss ? "text-red-500" : "text-green-500")} />
      <span className={cn("font-semibold", isLoss ? "text-red-600" : "text-green-600")}>{rate.toFixed(1)}%</span>
      <span>{label}</span>
    </div>
  )

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Andamento do Pipeline</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <FunnelStage title="Qualificação" count={qualificacaoCount} color="bg-blue-50" />
        <ConversionRate rate={qualificacaoToNegociacaoRate} label="para Negociação" />
        <FunnelStage title="Negociação" count={negociacaoCount} color="bg-yellow-50" />
        <div className="grid grid-cols-2 gap-2">
          <ConversionRate rate={negociacaoToFechadoRate} label="para Fechado" /> {/* Renomeado */}
          <ConversionRate rate={negociacaoToPerdidoRate} label="para Perdido" isLoss /> {/* Renomeado */}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <FunnelStage title="Fechado" count={fechadoCount} color="bg-green-50" /> {/* Renomeado */}
          <FunnelStage title="Perdido" count={perdidoCount} color="bg-red-50" /> {/* Renomeado */}
        </div>
      </CardContent>
    </Card>
  )
}

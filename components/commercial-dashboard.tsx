"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { TicketMedioChart } from "@/components/ticket-medio-chart"
import { LeadsOriginTable } from "@/components/leads-origin-table"
import { PipelineFunnelChart } from "@/components/pipeline-funnel-chart"
import { LostDealReasonsSummary } from "@/components/lost-deal-reasons-summary"
import { TrendingUp, DollarSign, FileText, CheckCircle, Target, Calendar } from "lucide-react"
import type { Deal } from "@/components/commercial-page"

interface CommercialDashboardProps {
  deals: Deal[]
}

export function CommercialDashboard({ deals }: CommercialDashboardProps) {
  const [leadsDataPeriod, setLeadsDataPeriod] = useState("month")

  const negociosNoPipe = deals.filter((deal) => deal.stage === "qualificacao" || deal.stage === "negociacao").length
  const oportunidades = deals
    .filter((deal) => deal.stage === "qualificacao" || deal.stage === "negociacao")
    .reduce((sum, deal) => sum + deal.value, 0)
  const vendasRealizadas = deals.filter((deal) => deal.stage === "fechado").length
  const totalLostValue = deals.filter((deal) => deal.stage === "perdido").reduce((sum, deal) => sum + deal.value, 0)

  const dashboardData = {
    propostasEnviadas: 302,
    ticketMedio: 61407.03,
    vendaMenorValor: 607.1,
    vendaMaiorValor: 536187.13,
    metaMensal: {
      valor: 0.0,
      meta: 125000.0,
      novaReceita: 108292.41,
    },
    metaAnual: {
      valor: 2126241.86,
      meta: 1500000.0,
      percentual: 141.75,
    },
  }

  return (
    <div className="space-y-6">
      {/* Cards de Métricas Principais */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Negócios no pipe</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{negociosNoPipe}</div>
            <p className="text-xs text-muted-foreground">Negócios</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Oportunidades</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {oportunidades.toLocaleString("pt-BR")}</div>
            <p className="text-xs text-muted-foreground">Oportunidades em aberto</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Propostas enviadas</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.propostasEnviadas}</div>
            <p className="text-xs text-muted-foreground">Propostas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Vendas realizadas</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vendasRealizadas}</div>
            <p className="text-xs text-muted-foreground">Vendas</p>
          </CardContent>
        </Card>
      </div>

      {/* Segunda linha com Ticket Médio e Metas */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Ticket Médio */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Ticket Médio</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-3xl font-bold">R$ {dashboardData.ticketMedio.toLocaleString("pt-BR")}</div>
            <div className="h-32">
              <TicketMedioChart />
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Venda de menor valor:</span>
                <span className="font-medium">R$ {dashboardData.vendaMenorValor.toLocaleString("pt-BR")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Venda de maior valor:</span>
                <span className="font-medium">R$ {dashboardData.vendaMaiorValor.toLocaleString("pt-BR")}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Meta Maio */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-green-600" />
              Meta Maio
            </CardTitle>
            <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">Mensal</div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-sm text-muted-foreground mb-1">
                Meta Mensal: R$ {dashboardData.metaMensal.meta.toLocaleString("pt-BR")}
              </div>
              <div className="text-3xl font-bold">R$ {dashboardData.metaMensal.valor.toLocaleString("pt-BR")}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Nova receita em caixa</div>
              <div className="text-2xl font-bold text-green-600">
                R$ {dashboardData.metaMensal.novaReceita.toLocaleString("pt-BR")}
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gray-400 h-2 rounded-full" style={{ width: "0%" }} />
            </div>
            <div className="text-center text-sm text-muted-foreground">0%</div>
          </CardContent>
        </Card>

        {/* Meta 2025 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-purple-600" />
              Meta 2025
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-sm text-muted-foreground mb-1">
                Meta Anual: R$ {dashboardData.metaAnual.meta.toLocaleString("pt-BR")}
              </div>
              <div className="text-3xl font-bold">R$ {dashboardData.metaAnual.valor.toLocaleString("pt-BR")}</div>
            </div>
            <div className="space-y-2">
              <Progress value={dashboardData.metaAnual.percentual} className="h-3" />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progresso</span>
                <span className="font-bold text-blue-600">{dashboardData.metaAnual.percentual}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Leads por origem, Funil do Pipeline e Motivos de Perda */}
      <div className="grid gap-6 lg:grid-cols-3">
        {" "}
        {/* Alterado para lg:grid-cols-3 para melhor controle */}
        <Card className="lg:col-span-2">
          {" "}
          {/* Leads por origem ocupa 2 colunas */}
          <CardHeader>
            <CardTitle>Leads por origem</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={leadsDataPeriod} onValueChange={setLeadsDataPeriod}>
              <TabsList>
                <TabsTrigger value="month">Dados do mês</TabsTrigger>
                <TabsTrigger value="year">Dados do ano</TabsTrigger>
              </TabsList>
              <TabsContent value="month" className="mt-4">
                <LeadsOriginTable period="month" />
              </TabsContent>
              <TabsContent value="year" className="mt-4">
                <LeadsOriginTable period="year" />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        {/* Agrupa Funil do Pipeline e Motivos de Perda na coluna restante */}
        <div className="flex flex-col gap-6 lg:col-span-1">
          {" "}
          {/* Ocupa 1 coluna e empilha verticalmente */}
          <PipelineFunnelChart deals={deals} />
          <LostDealReasonsSummary deals={deals} />
        </div>
      </div>
    </div>
  )
}

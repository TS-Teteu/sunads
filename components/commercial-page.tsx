"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CommercialDashboard } from "@/components/commercial-dashboard"
import { PipelineView } from "@/components/pipeline-view"
import { ContactsView } from "@/components/contacts-view"
import { ProposalsView } from "@/components/proposals-view"
import { ContractsView } from "@/components/contracts-view"
import { BarChart3, Users, FileText, DollarSign, ScrollText } from "lucide-react"

// Definindo a interface Deal aqui, pois CommercialPage será a fonte de verdade
export interface Deal {
  id: string
  title: string
  clientName: string
  value: number
  stage: "qualificacao" | "negociacao" | "fechado" | "perdido" // Nomes atualizados
  expectedCloseDate: string
  createdAt: string
  reasonForLoss?: "Cliente achou caro" | "Fechou com concorrente" | "Desistiu" | "Outros"
}

const initialDeals: Deal[] = [
  {
    id: "deal-1",
    title: "Projeto de SEO para E-commerce",
    clientName: "Loja Online X",
    value: 15000.0,
    stage: "qualificacao",
    expectedCloseDate: "2024-02-20",
    createdAt: "2024-01-10",
  },
  {
    id: "deal-2",
    title: "Desenvolvimento de App Mobile",
    clientName: "Startup Inovadora",
    value: 45000.0,
    stage: "qualificacao",
    expectedCloseDate: "2024-02-28",
    createdAt: "2024-01-15",
  },
  {
    id: "deal-3",
    title: "Campanha de Google Ads",
    clientName: "Agência Digital Alpha",
    value: 8000.0,
    stage: "negociacao",
    expectedCloseDate: "2024-02-18",
    createdAt: "2024-01-18",
  },
  {
    id: "deal-4",
    title: "Consultoria de Marketing Digital",
    clientName: "Empresa Crescer",
    value: 25000.0,
    stage: "qualificacao",
    expectedCloseDate: "2024-03-05",
    createdAt: "2024-01-20",
  },
  {
    id: "deal-5",
    title: "Sistema CRM Personalizado",
    clientName: "Grandes Negócios S.A.",
    value: 120000.0,
    stage: "fechado", // Atualizado
    expectedCloseDate: "2024-01-30",
    createdAt: "2024-01-01",
  },
  {
    id: "deal-6",
    title: "Otimização de Conversão",
    clientName: "Pequenos Empreendedores",
    value: 7000.0,
    stage: "perdido", // Atualizado
    expectedCloseDate: "2024-01-25",
    createdAt: "2024-01-05",
    reasonForLoss: "Cliente achou caro",
  },
]

export default function CommercialPage() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [deals, setDeals] = useState<Deal[]>(initialDeals)

  const handleAddDeal = (newDeal: Omit<Deal, "id" | "createdAt">) => {
    const deal: Deal = {
      ...newDeal,
      id: `deal-${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
    }
    setDeals((prevDeals) => [...prevDeals, deal])
  }

  const handleUpdateDealStage = (dealId: string, newStage: Deal["stage"]) => {
    setDeals((prevDeals) =>
      prevDeals.map((deal) => (deal.id === dealId ? { ...deal, stage: newStage, reasonForLoss: undefined } : deal)),
    )
  }

  const handleSaveReasonForLoss = (dealId: string, reason: string) => {
    setDeals((prevDeals) =>
      prevDeals.map((deal) =>
        deal.id === dealId ? { ...deal, stage: "perdido", reasonForLoss: reason as Deal["reasonForLoss"] } : deal,
      ),
    )
  }

  const handleDeleteDeal = (dealId: string) => {
    setDeals((prevDeals) => prevDeals.filter((deal) => deal.id !== dealId))
  }

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Comercial</h2>
      </div>

      {/* Navigation Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="pipeline" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Pipeline de negócios
          </TabsTrigger>
          <TabsTrigger value="contacts" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Contatos
          </TabsTrigger>
          <TabsTrigger value="proposals" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Propostas
          </TabsTrigger>
          <TabsTrigger value="contracts" className="flex items-center gap-2">
            <ScrollText className="h-4 w-4" />
            Contratos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <CommercialDashboard deals={deals} /> {/* Passando deals para o Dashboard */}
        </TabsContent>

        <TabsContent value="pipeline">
          <PipelineView
            deals={deals}
            onAddDeal={handleAddDeal}
            onUpdateDealStage={handleUpdateDealStage}
            onSaveReasonForLoss={handleSaveReasonForLoss}
            onDeleteDeal={handleDeleteDeal}
          />
        </TabsContent>

        <TabsContent value="contacts">
          <ContactsView />
        </TabsContent>

        <TabsContent value="proposals">
          <ProposalsView />
        </TabsContent>

        <TabsContent value="contracts">
          <ContractsView />
        </TabsContent>
      </Tabs>
    </div>
  )
}
